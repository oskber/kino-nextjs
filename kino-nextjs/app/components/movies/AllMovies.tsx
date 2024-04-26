import fetchAllMovies from '../../lib/data';

export default function AllMovies() {
  const movies = fetchAllMovies();

  return (
    <>
      {movies.map((movie) => (
        <h1 className='text-white'>{movie.Title}</h1>
      ))}
    </>
  );
}
