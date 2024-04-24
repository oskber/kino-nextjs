import { NextResponse, NextRequest } from 'next/server';
import { moviesList } from '../../../public/mockMovies';
interface Movies {
  Title: String;
  ID: String;
  Year: Number;
  Released: Boolean;
  Category: String;
  Rating: Number;
  Description: String;
  Poster: String;
}
export const movies: Movies[] = moviesList;

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ movies }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Kolla med IT-killen på våning 2.' },
      { status: 500 }
    );
  }
}
