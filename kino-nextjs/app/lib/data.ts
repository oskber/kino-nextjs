import { moviesList } from "../../public/mockMovies";
import { Movies } from "./types";
import { Movie } from "./schema";
import mongoose from "mongoose";
import "dotenv/config";

//Here we will fetch all the different data from database when it is set up

export default function fetchAllMovies() {
    const movies: Movies[] = moviesList;
    return movies;
}

export async function fetchMovie(id: string) {
    try {
        await mongoose.connect(process.env.DB_URL);
    } catch (error) {
        throw new Error("Failed to connect to database.");
    }

    try {
        const movie = await Movie.findById(id);
        await mongoose.disconnect();
        return movie;
    } catch (error) {
        await mongoose.disconnect();
        throw new Error("Failed to fetch movie with id.");
    }
}
