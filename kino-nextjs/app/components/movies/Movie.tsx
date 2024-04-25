import { fetchMovie } from "../../lib/data";

export default function Movie({id}: { id: string }){
  const movie = fetchMovie(id);
  
  return (
    <>
    <h1>{movie?.Title}</h1>
    </>
  )
}