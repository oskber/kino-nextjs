import { Tmovie, Movies, screening } from './types';
import { Movie, Review, Screening } from './schema';
import mongoose from 'mongoose';

//Here we will fetch all the different data from database when it is set up

const URL: string = process.env.DB_URL ?? '';

mongoose.connect(URL).catch((error) => {
  throw new Error(error);
});

export async function fetchMoviesNow() {
  try {
    const movies: Movies = await Movie.find({
      Released: true,
    });

    return movies;
  } catch {
    throw new Error('Failed to fetch current movies.');
  }
}
export async function searchMoviesNow(query: string) {
  try {
    const movies: Movies = await Movie.find({
      $or: [
        { Title: { $regex: query, $options: 'i' } },
        { Genre: { $regex: query, $options: 'i' } },
      ],
    }).exec();

    return movies;
  } catch {
    throw new Error('Failed to fetch current movies.');
  }
}

export async function fetchMovie(id: string) {
  try {
    const movie: Tmovie = Movie.findById(id);
    return movie;
  } catch (error) {
    throw new Error('Failed to fetch movie with id.');
  }
}

export async function fetchComingMovies() {
  try {
    const Comingmovies: Movies = await Movie.find({ Released: false });
    return Comingmovies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

export async function fetchReviews(id: string, page: number, perPage: number) {
  try {
    const totalReviews = await Review.countDocuments({ movieId: id });
    const reviews = await Review.find({ movieId: id })
      .skip(perPage * (page - 1))
      .limit(perPage);

    return { reviews, totalReviews };
  } catch (error) {
    throw new Error('Failed to fetch reviews');
  }
}

export async function fetchFilteredScreenings(id: string, date: string) {
  try {
    const screenings: screening[] = await Screening.find({
      MovieId: new mongoose.Types.ObjectId(id),
    });
    const filteredScreenings = screenings.filter((screening) => {
      return screening.Date.includes(date);
    });
    return filteredScreenings;
  } catch (error) {
    throw new Error('Failed to fetch screenings with id.');
  }
}
