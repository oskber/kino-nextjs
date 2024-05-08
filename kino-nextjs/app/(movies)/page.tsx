import MoviesNow from '../components/movies/MoviesNow';
import ComingMovies from '../components/movies/ComingMovies';
import SearchModal from '../components/navigation/SearchBar/SearchModal';
import { Metadata } from 'next';

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
      <SearchModal query={query} />
      <MoviesNow />
      <ComingMovies />
    </main>
  );
}
