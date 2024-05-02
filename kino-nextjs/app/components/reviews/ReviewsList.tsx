import { fetchReviews } from '../../lib/data';

export default async function ReviewsList({ id }: { id: string }) {
  const reviews = await fetchReviews(id);

  return (
    <>
      <div className="flex flex-col rounded">
        <ul>
          {reviews.map((review) => (
            <li
              className="text-white flex justify-between gap-1  border-b-2 p-2"
              key={review._id}>
              <div className=" flex-col">
                <h3 className="font-bold">{review.name}</h3>
                <p>{review.comment}</p>
              </div>
              <p>Betyg: {review.rating}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
