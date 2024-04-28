import { fetchComingMovies } from '../../lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function ComingMovies() {
  const comingMovies = await fetchComingMovies();

  return (
    <section className=' text-white mt-3 '>
      <div className='flex justify-center text-3xl'>
        <h2 className='text-custom_yellow font-bold'> Kommande filmer</h2>
      </div>
      <div className=' flex flex-nowrap gap-5 py-4 px-2 sm:px-0 justify-center overflow-x-auto'>
        {comingMovies.map((movie) => (
          <div key={movie._id} className='flex-shrink-0 w-64 max-w-xs '>
            <img
              src={movie.Poster}
              alt='Movie image'
              className='w-full h-96 object-cover'
            />
            <div className='mt-4 flex flex-col'>
              <h1 className='text-xl font-bold'>{movie.Title}</h1>
              <span className=''>{movie.Genre}</span>
              <Link
                href={`http://localhost:3000/${movie._id}`}
                className='bg-custom_yellow w-20 text-center rounded-sm'
              >
                Boka
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
