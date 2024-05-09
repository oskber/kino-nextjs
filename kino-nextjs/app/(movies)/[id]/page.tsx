import Movie from '../../components/movies/Movie';
import ReviewForm from '../../components/reviews/ReviewForm';
import ReviewsList from '../../components/reviews/ReviewsList';
import Screenings from "../../components/movies/Screenings";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filmsida',
};

export default async function Page({
    params,
    searchParams,
}: {
    params: {
        id: string;
    };
    searchParams?: {
        date?: string;
    };
}) {
    return (
        <main className='mt-20 grid justify-center text-white'>
            <Movie id={params.id} />
            <Screenings id={params.id} date={searchParams?.date} />
            <div className='px-5 m-auto sm:w-5/6 md:w-1/2 lg:w-1/3'>
            <ReviewForm />
            <ReviewsList id={params.id} searchParams={searchParams} />
            </div>
        </main>
    );
}
