import Movie from '../../components/movies/Movie';
import ReviewForm from '../../components/reviews/ReviewForm';
import ReviewsList from '../../components/reviews/ReviewsList';

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <Movie id={params.id} />
      <div className="w-1/3 m-auto">
        <ReviewForm />
        <ReviewsList id={params.id} searchParams={searchParams} />
      </div>
    </>
  );
}
