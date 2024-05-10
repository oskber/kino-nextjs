//Here we will put all bigger types and import the into different componenets

export type Tmovie = {
    _id: String,
    Title: String,
    Released: Boolean,
    Genre: String,
    Rating: Number,
    imdbRating: String,
    Description: String,
    Poster: String,
    __v: Number,
};

export type Movies = Tmovie[];


type booking = {
    _id: string,
    Seats: (0 | 1)[][],
    Price: string,
    Email: string,
    Date: string

}

export type screening = {
    _id: string,
    MovieId: string,
    Date: string,
    Seats: (0 | 1)[][],
    Bookings: booking[] | [],
}
