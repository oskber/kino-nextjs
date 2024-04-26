import { fetchComingMovies } from '../../lib/data';
import Image from 'next/image';

export default async function ComingMovies() {
  const comingMovies = await fetchComingMovies();

  return (
    <section className='overflow-x-auto text-white mt-3'>
      <div className='flex justify-center text-3xl'>
        <h2 className=''> Kommande filmer</h2>
      </div>
      <div className='flex flex-nowrap space-x-4 py-4 px-2 md:px-0 justify-center'>
        {comingMovies.map((movie) => (
          <div key={movie._id} className='flex-shrink-0 w-64 max-w-xs'>
            <img
              src={movie.Poster}
              alt='Movie image'
              className='w-full h-96 object-cover'
            />
            <div className='mt-4 flex flex-col'>
              <h1 className='text-xl font-bold'>{movie.Title}</h1>
              <span className=''>{movie.Genre}</span>
              <button className='border'>Button component here</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
