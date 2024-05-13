import { fetchMovie } from "../../lib/data";
import { StarIcon } from "@heroicons/react/20/solid";
import { Tmovie } from "../../lib/types";

export default async function Movie({ id }: { id: string }) {
    const movie: Tmovie = await fetchMovie(id);
    return (
        <>
            <section className='grid grid-cols-6 align-middle items-center justify-center max-w-7xl'>
                <img
                    className='col-start-2 col-span-4 row-start-1 self-start max-w-96  sm:col-start-4 sm:col-span-2 justify-self-stretch'
                    src={movie?.Poster}
                    alt='Movie poster'
                />
                <div className='mt-8 row-start-2 col-start-2 col-span-4 self-start justify-self-center flex flex-col sm:row-start-1 sm:col-start-2 sm:col-span-2 sm:mr-9'>
                    <h2 className='text-2xl lg:text-3xl mb-3 font-bold'>{movie?.Title}</h2>
                    <p className='mb-3'>
                        <StarIcon className='w-4 h-4 text-custom_yellow inline-block align-text-top' />{" "}
                        {movie?.imdbRating}
                    </p>
                    <p className='mb-3 text-lg font-bold text-custom_yellow'>
                        Kategori:
                        <span className='font-normal text-white'>{` ${movie?.Genre}`}</span>
                    </p>
                    <p className='sm:text-lg'>{movie?.Description}</p>
                </div>
            </section>
        </>
    );
}
