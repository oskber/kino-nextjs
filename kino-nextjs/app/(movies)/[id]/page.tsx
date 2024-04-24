
import Movie from "../../components/movies/Movie";

export default function Page({params}: { params: { id:string } }){
  return (
    <>
    <Movie id={params.id} />
    </>
  )
}