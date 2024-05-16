
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Released: {
        type: Boolean,
        required: true,
    },
    Genre: {
        type: String,
        required: true,
    },
    Rating: {
        type: Number,
        required: true,
    },
    imdbRating: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Poster: {
        type: String,
        required: true,
    },
});

const Movie = mongoose.models?.Movie || mongoose.model("Movie", movieSchema);

const screeningSchema = new mongoose.Schema({
    MovieId: { type: String, required: true },
    Date: { type: String, required: true },
    Seats: {type: Array, required: true},
    Bookings: { type: Array, required: true },
});

const Screening = mongoose.models?.Screening || mongoose.model("Screening", screeningSchema);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Fyll i ditt förnamn"],
    },
    lastname: {
        type: String,
        required: [true, "Fyll i ditt efternamn"],
    },
    email: {
        type: String,
        required: [true, "Fyll i en e-postadress"],
        unique: [true, "Ett konto med denna e-postadress finns redan registrerat"],
        validate: {
            validator: (value: string) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: "Fyll i en giltig e-postadress",
        },
    },
    password: {
        type: String,
        required: [true, "Lösenordet måste vara minst 6 tecken långt"],
        validate: {
            validator: (value: string) => {
                return value.length >= 6;
            },
            message: "Lösenordet måste vara minst 6 tecken långt",
        },
    },
});

const userModel = mongoose.models?.User || mongoose.model("User", userSchema);

const reviewSchema = new mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
    movieId: {type: String, required: true},
});
  
const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
  

export { Movie, userModel, Screening, Review  };
