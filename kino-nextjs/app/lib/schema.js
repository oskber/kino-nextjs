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

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Fyll i ditt förnamn'],
    },
    lastname: {
        type: String,
        required: [true, 'Fyll i ditt efternamn']
    },
    email: {
        type: String,
        required: [true, 'Fyll i en e-postadress'],
        unique: [true, 'Ett konto med denna e-postadress finns redan registrerat'],
        validate: {
            validator: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Fyll i en giltig e-postadress'
        }
    },
    password: {
        type: String,
        required: [true, 'Lösenordet måste vara minst 6 tecken långt'],
        validate: {
            validator: (value) => {
                return value.length >= 6;
            },
            message: 'Lösenordet måste vara minst 6 tecken långt'
        }
    }
});

const userModel = mongoose.models?.User || mongoose.model('User', userSchema);

export { Movie, userModel };
