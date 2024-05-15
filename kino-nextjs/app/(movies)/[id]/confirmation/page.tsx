import Movie from "app/components/movies/Movie";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <main className="mt-20 grid justify-center text-white">
      <div className="mb-5 ">
        <h1 className="text-2xl lg:text-3xl text-center font-bold ">
        <CheckIcon className="h-24 w-24 text-black m-auto bg-green-700 rounded-full" />
          Tack för ditt biljettköp!
        </h1>
        <p className="text-center mt-3">
          En bokningsbekräftelse har skickats till din e-postadress.
        </p>
        <hr className="h-0.5 my-3 bg-gray-200 border-0"></hr>
      </div>

      <Movie id={params.id} />
      <Link
        className="bg-custom_yellow w-24 h-7 font-bold text-center rounded-sm mt-10 mb-10 m-auto hover:bg-amber-500 text-black"
        href={{
          pathname: `/`,
        }}
      >
        Hem
      </Link>
    </main>
  );
}
