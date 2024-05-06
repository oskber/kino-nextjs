import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import { fetchReviews } from '../../lib/data';
import Link from 'next/link';

interface ReviewsListProps {
  id: string;
  searchParams?: {
    page?: string;
  };
}

export default async function ReviewsList({
  id,
  searchParams,
}: ReviewsListProps) {
  let page = Number(searchParams?.page) || 1;
  page = !page || page < 1 ? 1 : page;

  const perPage = 5;
  const { reviews, totalReviews } = await fetchReviews(id, page, perPage);

  const totalPages = Math.ceil(totalReviews / 5);

  const prevPage = page - 1 ? page - 1 : 1;
  const nextPage = page + 1;
  const pageOutofRange = page > totalPages;

  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  return (
    <>
      <div className="flex flex-col rounded">
        <ul>
          {reviews.map((review) => (
            <li
              className="text-white flex justify-between gap-1 border-b-2 border-custom_yellow p-2 break-all"
              key={review._id}>
              <div className="flex-1">
                <h3 className="font-bold">{review.name}</h3>
                <p className="pr-10">{review.comment}</p>
              </div>
              <p className="pt-2">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="inline-block w-5 h-5 mr-0.5 text-custom_yellow"
                  />
                ))}
              </p>
            </li>
          ))}
        </ul>

        {pageOutofRange ? (
          <div className="text-white font-light italic">
            Inga kommentarer än...
          </div>
        ) : (
          <div className="flex justify-center items-center mt-10">
            <div className="flex border-[1px] gap-4 rounded border-custom_yellow p-2">
              {page === 1 ? (
                <div className="opacity-60 text-white" aria-disabled="true">
                  <ChevronLeftIcon className="text-custom_yellow w-6 h-6" />
                </div>
              ) : (
                <Link
                  scroll={false}
                  className="text-custom_yellow"
                  href={`?page=${prevPage}`}
                  aria-label="Previous Page">
                  <ChevronLeftIcon className="text-custom_yellow w-6 h-6" />
                </Link>
              )}

              {pageNumbers.map((pageNumber, index) => (
                <Link
                  scroll={false}
                  key={index}
                  className={
                    page === pageNumber
                      ? 'text-white font-bold px-2 rounded-md bg-custom_yellow'
                      : ' text-white'
                  }
                  href={`?page=${pageNumber}`}>
                  {pageNumber}
                </Link>
              ))}

              {page === totalPages ? (
                <div className="opacity-60 text-white" aria-disabled="true">
                  <ChevronRightIcon className="text-custom_yellow w-6 h-6" />
                </div>
              ) : (
                <Link
                  scroll={false}
                  className="text-custom_yellow"
                  href={`?page=${nextPage}`}
                  aria-label="Next Page">
                  <ChevronRightIcon className="text-custom_yellow w-6 h-6" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
