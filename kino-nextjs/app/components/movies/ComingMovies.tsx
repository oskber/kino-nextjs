import { fetchComingMovies } from '../../lib/data';
import MovieButton from './MovieButton';
import Image from 'next/image';

export default async function ComingMovies() {
  const comingMovies = await fetchComingMovies();

  return (
    <section className=' text-white grid max-w-7xl mr-8 ml-8 mb-10 mt-10'>
      <h2 className='col-start-1 mb-4 text-xl font-bold text-custom_yellow'>
        {' '}
        Kommande filmer
      </h2>
      <div className='flex flex-nowrap justify-start lg:grid max-lg:overflow-x-auto max-lg:whitespace-nowrap lg:grid-cols-5 lg:row-start-2 lg:col-start-1 lg:col-span-6 gap-4'>
        {comingMovies.map((movie) => (
          <div
            key={movie._id}
            className='flex flex-col flex-shrink-0 max-w-56 justify-between bg-gray-800 bg-opacity-70 rounded-md'
          >
            <div>
              <Image
              height={320}
              width={320}
                src={movie.Poster}
                alt='Movie image'
                className='object-cover lg:max-h-80 w-full rounded-t-md'
              />
              <h2 className='ml-3 mr-3 mt-2 text-[1rem] font-bold text-wrap text-white'>
                {movie.Title}
              </h2>
            </div>
            <div className='p-3 flex flex-col text-wrap'>
              <span>{movie.Genre}</span>
              <span className='text-xs'>Premiär: 2024-06-26</span>
              <MovieButton movieId={movie._id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
