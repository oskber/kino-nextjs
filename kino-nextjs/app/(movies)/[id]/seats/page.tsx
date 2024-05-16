import BookingSeat from "app/components/movies/BookingSeat";
import { fetchMovie, fetchScreening } from "../../../lib/data";
import TicketSelector from "app/components/movies/TicketSelector";
import { GetServerSideProps } from "next";
import Movie from "app/components/movies/Movie";
import { TicketProvider } from "app/contexts/TicketContext";

export default async function Seats({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { screeningId: string };
}) {
  const movie = await fetchMovie(params.id);
  const screening = await fetchScreening(searchParams.screeningId);

  return (
    <>
      <TicketProvider>
        <main className='mt-20 grid justify-center'>
          <section className='grid grid-cols-12'>
            <h2 className='text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white col-start-2 col-end-12 text-center justify-self-center mb-3 font-bold'>
              {movie?.Title}
            </h2>
            <div className='col-start-5 col-span-4 sm:col-start-4 sm:col-span-6 md:col-start-4 md:col-span 4 flex justify-center'>
              <div>
                <h1 className='text-custom_yellow text-center text-xl mt-8 mb-2'>
                  Välj antal biljetter
                </h1>
                <TicketSelector />
              </div>
            </div>
            <img
              className='col-start-10 col-span-2 self-start sm:col-start-10 sm:col-span-2 justify-self-stretch object-contain h-auto'
              src={movie?.Poster}
              alt=''
            />
          </section>
          <section className='section-grid-booking'>
            <div className='col-start-3 col-span-3 m-4'>
              <div className='bg-white h-0.5'></div>
            </div>
            <div className='grid-item-booking'>
              <h1 className='text-custom_yellow text-xl text-center mt-8'>
                Välj platser
              </h1>
              <div className='mt-4'>
                <div className='bg-custom_red h-2'></div>
              </div>
              <BookingSeat screening={screening} />
            </div>
          </section>
        </main>
      </TicketProvider>
    </>
  );
}
