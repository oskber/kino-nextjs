"use server";

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { State } from '../lib/definitions';
import { userModel, Screening, Review, Movie } from './schema';
import { signIn, auth, signOut } from '../../auth';
import { AuthError } from 'next-auth';
import { MongoError } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { booking } from './types';

export async function createUser(
  prevState: State | undefined,
  formData: FormData
) {
  const { name, lastname, email, password, password2 } =
    Object.fromEntries(formData);
  const passwordsMatch = password === password2;
  let success = false;
  try {
    const hashedPassword =
      password.toString().length > 5
        ? await bcrypt.hash(password.toString(), 10)
        : "";
    const user = new userModel({
      name,
      lastname,
      email,
      password: hashedPassword,
    });
    await user.validate();
    if (!passwordsMatch) throw new Error();
    await user.save();
    success = true; // Redirect can't be called in a try block so used boolean to check if user was created successfully
  } catch (error) {
    const errors: Array<string> = [];
    if (!passwordsMatch) errors.push("Lösenorden matchar inte");
    if (error instanceof mongoose.Error.ValidationError) {
      for (const field in error.errors) {
        errors.push(error.errors[field].message);
      }
    } else if (error instanceof MongoError && error.code === 11000) {
      errors.push("E-postadressen är redan registrerad.");
    }
    return { ...prevState, errors };
  }
  if (success) redirect("/login");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { email, password } = Object.fromEntries(formData);
    if (!email || !password) {
      return "Fyll i e-postadress och lösenord.";
    }
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Felaktig e-postaddress eller lösenord.";
        default:
          return "Något gick fel.";
      }
    }
    throw error;
  }
}

export async function getUser() {
  const session = await auth();
  return session?.user;
}

export const addReview = async (
  formData: FormData,
  movieId: String,
  rating: number
) => {
  const name = formData.get("name");
  const comment = formData.get("comment");

  const review = new Review({ name, comment, movieId, rating });

  try {
    await review.save();
    console.log('Review added');

    updateMovieRating(movieId);
  } catch (error) {
    console.error("Failed to add review", error);
  }

  revalidatePath("/");
};

export async function logout() {
  await signOut();
}

async function updateMovieRating(id: String) {
  const reviews = await Review.find({ movieId: id });
  let ratingSum = 0;
  reviews.forEach((review) => {
    ratingSum += review.rating;
  });
  const averageRating = Math.round((ratingSum / reviews.length) * 10) / 10;
  await Movie.findOneAndUpdate({ _id: id }, { Rating: averageRating });
}


export async function createBooking(booking: booking, screeningId: string) {
  try {
    const screening = await Screening.findById(screeningId);
    const seatMatrix = screening.Seats;

    booking.Seats.forEach((seat) => {
      seatMatrix[seat[0]][seat[1]] = 1;
    });

    await Screening.findOneAndUpdate(
      { _id: screeningId },
      { Seats: seatMatrix }
    );
    await Screening.findOneAndUpdate(
      { _id: screeningId },
      { $push: { Bookings: booking } }
    );
    revalidatePath('/')
    console.log("Booking successfull!");
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error("Failed to create booking");
  }
}