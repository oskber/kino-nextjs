import MoviesNow from '../components/movies/MoviesNow';
import ComingMovies from '../components/movies/ComingMovies';

export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || '';
  return (
    <main className='mt-20 grid justify-center'>
      <MoviesNow query={query} />
      <ComingMovies />
    </main>
  );
}
