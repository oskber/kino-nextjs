import { fetchReviews } from '../../lib/data';

export default async function ReviewsList() {
  const reviews = await fetchReviews();
  return (
    <>
      <div className="flex flex-col bg-custom_red">
        <ul>
          {reviews.map((review) => (
            <li
              className="text-white flex justify-between gap-1 border border-custom_yellow p-2 rounded"
              key={review._id}>
              <div className=" flex-col">
                <h3>Namn: {review.name}</h3>
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
