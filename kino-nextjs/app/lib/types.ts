//Here we will put all bigger types and import the into different componenets

export type Tmovie = {
  _id: String;
  Title: String;
  Released: Boolean;
  Screenings: string[];
  Genre: String;
  Rating: Number;
  imdbRating: String;
  Description: String;
  Poster: String;
  __v: Number;
};

export type Movies = Tmovie[];
