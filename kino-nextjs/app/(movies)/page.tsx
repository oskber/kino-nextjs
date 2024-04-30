import MoviesNow from '../components/movies/MoviesNow';
import ComingMovies from '../components/movies/ComingMovies';

export default function Page() {
  return (
    <main className="mt-20 grid justify-center">
      <MoviesNow />
      <ComingMovies />
    </main>
  );
}
