import { Tmovie, Movies } from './types';
import { Movie } from './schema';
import mongoose from 'mongoose';

//Here we will fetch all the different data from database when it is set up

const URL: string = process.env.DB_URL ?? '';

mongoose.connect(URL).catch((error) => {
  throw new Error(error);
});

export default async function fetchMoviesNow(query: string) {
  try {
    const movies: Movies = await Movie.find({
      Released: true,
      $or: [
        { Title: { $regex: query, $options: 'i' } },
        { Description: { $regex: query, $options: 'i' } },
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
    const movie: Tmovie | null = await Movie.findById(id);
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
