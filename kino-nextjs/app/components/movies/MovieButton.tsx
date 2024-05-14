import Link from 'next/link';

export default function MovieButton({ movieId }: { movieId: String }) {
  return (
    <>
      <Link
        data-cy='movie-button'
        href={`/${movieId}`}
        className='bg-custom_yellow w-20 font-bold text-center rounded-sm mt-3'>
        Se mer
      </Link>
    </>
  );
}
