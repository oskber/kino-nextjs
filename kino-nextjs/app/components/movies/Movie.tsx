import { fetchMovie, countReviews } from '../../lib/data';
import { StarIcon } from '@heroicons/react/20/solid';
import { Tmovie } from '../../lib/types';
import Image from 'next/image';

export default async function Movie({ id }: { id: string }) {
  const movie: Tmovie = await fetchMovie(id);
  const reviewCount = await countReviews(id);
  return (
    <>
      <section className='grid grid-cols-6 align-middle items-center justify-center max-w-7xl'>
        <Image
          width={400}
          height={350}
          style={{ width: '500' }}
          className='col-start-2 col-span-4 row-start-1 self-start sm:col-start-4 sm:col-span-2'
          src={movie?.Poster}
          alt='Movie poster'
        />
        <div className='mt-8 row-start-2 col-start-2 col-span-4 self-start justify-self-center flex flex-col sm:row-start-1 sm:col-start-2 sm:col-span-2 sm:mr-9'>
          <h2 className='text-2xl lg:text-3xl mb-3 font-bold'>{movie.Title}</h2>
          {reviewCount < 5 && (
            <div className='mb-3'>
              <p className=' bg-yellow-500 text-black text-xs font-black rounded-sm w-fit p-[0.10rem] inline-block align-middle mr-1'>
                {' '}
                IMDB
              </p>
              {movie.imdbRating}
            </div>
          )}
          {reviewCount >= 5 && (
            <p>
              <StarIcon className='w-4 h-4 text-custom_yellow inline-block align-text-top' />{' '}
              {movie.Rating}
            </p>
          )}

          <p className='mb-3 text-lg font-bold text-custom_yellow'>
            Kategori:
            <span className='font-normal text-white'>{` ${movie.Genre}`}</span>
          </p>
          <p className='sm:text-lg'>{movie.Description}</p>
        </div>
      </section>
    </>
  );
}
