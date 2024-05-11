import { searchMoviesNow } from '../../../lib/data';
import SearchMovies from './SearchInput';
import Link from 'next/link';

export default async function SearchDropdown({ query }: { query: string }) {
  const movies = query.length > 2 ? await searchMoviesNow(query) : [];

  return (
    <>
      <search className='flex flex-col justify-self-center mb-5'>
        <SearchMovies />
        <div className='max-h-85 bg-white text-black gap-1 w-[350px] overflow-y-scroll overflow-x-hidden'>
          {query.length > 0 &&
            movies.map((movie) => (
              <Link
                href={`http://localhost:3000/${movie._id}`}
                key={`${movie._id}`}
              >
                <div className='flex flex-row text-sm shadow-xl hover:bg-blue-200'>
                  <img
                    src={`${movie.Poster}`}
                    alt={`${movie.Title}`}
                    className='w-14'
                  />
                  <div className='text-sm'>
                    <p>{movie.Title}</p>
                    <p>{movie.Genre}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </search>
    </>
  );
}
