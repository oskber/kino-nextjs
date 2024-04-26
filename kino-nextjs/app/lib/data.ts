import { moviesList } from '../../public/mockMovies';
import { Movies } from './types';
import mongoose from 'mongoose';

//Here we will fetch all the different data from database when it is set up

export default function fetchAllMovies() {
  const movies: Movies[] = moviesList;
  return movies;
}

export function fetchMovie(id: string) {
  const movies: Movies[] = moviesList;
  const movieID: string = id;
  return movies.find((movie) => movie.ID === movieID);
}

export async function fetchComingMovies() {
  try {
    const Comingmovies: Movies[] = await Movie.find({ Released: false });
    return Comingmovies;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}
