import Movie from '../../components/movies/Movie';
import ReviewForm from '../../components/reviews/ReviewForm';
import ReviewsList from '../../components/reviews/ReviewsList';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Movie id={params.id} />
      <div className="w-1/3 m-auto">
        <ReviewForm />
        <ReviewsList />
      </div>
    </>
  );
}
