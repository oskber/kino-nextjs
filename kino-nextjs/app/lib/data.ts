import { moviesList } from '../../public/mockMovies';
import { Movies } from './types';
import { Movie } from './schema';
import mongoose from 'mongoose';
import 'dotenv/config';

//Here we will fetch all the different data from database when it is set up

mongoose.connect(process.env.DB_URL).catch((error) => {
  throw new Error(error);
});

export default function fetchAllMovies() {
  const movies: Movies[] = moviesList;
  return movies;
}

export async function fetchMovie(id: string) {
  try {
    const movie = await Movie.findById(id);
    return movie;
  } catch (error) {
    throw new Error('Failed to fetch movie with id.');
  }
}

export async function fetchComingMovies() {
  try {
    const Comingmovies: Movies[] = await Movie.find({ Released: false });
    return Comingmovies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}
