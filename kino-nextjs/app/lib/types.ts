//Here we will put all bigger types and import the into different componenets

export type Tmovie = {
  _id: string;
  Title: string;
  Released: boolean;
  Genre: string;
  Rating: number;
  imdbRating: string;
  Description: string;
  Poster: string;
  __v: number;
};

export type Movies = Tmovie[];

type booking = {
  _id: string;
  Seats: (0 | 1)[][];
  Price: string;
  Email: string;
  Date: string;
};

export type screening = {
  _id: string;
  MovieId: string;
  Date: string;
  Seats: (0 | 1)[][];
  Bookings: booking[] | [];
};
