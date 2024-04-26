import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    Title: String,
    Released: Boolean,
    Screenings: Array,
    Genre: String,
    Rating: Number,
    imdbRating: String,
    Description: String,
    Poster: String,
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export { Movie };
