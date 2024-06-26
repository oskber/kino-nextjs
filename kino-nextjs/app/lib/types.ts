//Here we will put all bigger types and import the into different componenets

export type SeatStatus = 0 | 1;
export type SeatRow = SeatStatus[];
export type SeatMatrix = SeatRow[];

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

export type booking = {
  Seats: number[][];
  Price: string;
  Email: string;
  Date: string;
};

export type screening = {
  _id: string;
  MovieId: string;
  Date: string;
  Seats: SeatMatrix;
  Bookings: booking[];
};
