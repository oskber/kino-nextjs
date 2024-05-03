import { StarIcon } from '@heroicons/react/20/solid';
import { fetchReviews } from '../../lib/data';
import PaginationControls from './PaginationControls';

interface ReviewsListProps {
  id: string;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function ReviewsList({
  id,
  searchParams,
}: ReviewsListProps) {
  const page = Number(searchParams['page']) ?? 1;
  const itemsPerPage = Number(searchParams['per_page']) ?? 5;
  const reviews = await fetchReviews(id, page, itemsPerPage);

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
        <PaginationControls
          hasNextPage={reviews.length === 5}
          hasPrevPage={Number(page) > 1}
        />
      </div>
    </>
  );
}
