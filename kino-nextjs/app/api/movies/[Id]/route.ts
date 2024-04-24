import { movies } from '../route';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { Id: string } }
) {
  const movieID = params.Id;

  const movie = movies.find((movie) => movie.ID === movieID);

  if (!movie) {
    return NextResponse.json(
      { message: 'Finns inte såhär många filmer.' },
      { status: 404 }
    );
  }

  return NextResponse.json(movie, { status: 200 });
}
