import MoviesNow from '../components/movies/MoviesNow';
import ComingMovies from '../components/movies/ComingMovies';
import { Metadata } from 'next';
import SearchDropdown from '../components/navigation/SearchBar/SearchDropdown';

export const metadata: Metadata = {
  title: 'Startsida',
};

export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || '';
  return (
    <main className='mt-20 grid justify-center'>
      <SearchDropdown query={query} />
      <MoviesNow />
      <ComingMovies />
    </main>
  );
}
