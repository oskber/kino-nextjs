import Movie from '../../components/movies/Movie';
import ReviewForm from '../../components/reviews/ReviewForm';
import ReviewsList from '../../components/reviews/ReviewsList';

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    page?: string;
  };
}) {
  return (
    <>
      <Movie id={params.id} />
      <div className="px-5 m-auto sm:w-5/6 md:w-1/2 lg:w-1/3">
        <ReviewForm />
        <ReviewsList id={params.id} searchParams={searchParams} />
      </div>
    </>
  );
}
