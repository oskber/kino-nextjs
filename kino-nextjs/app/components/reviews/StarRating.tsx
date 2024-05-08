import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';

type StarRatingProps = {
  onRatingChange: (value: number) => void;
};

export default function StarRating({ onRatingChange }: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingChange = (value: number) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <div className='mb-3'>
      {[...Array(5)].map((_, i) => {
        const currentRating = i + 1;
        return (
          <label
            key={i}
            onMouseEnter={() => setHoverRating(currentRating)}
            onMouseLeave={() => setHoverRating(0)}>
            <input
              type='radio'
              name='rating'
              value={currentRating}
              onClick={() => handleRatingChange(currentRating)}
              className='hidden'
            />
            <StarIcon
              data-cy={'rating'}
              key={i}
              className={`w-8 h-8 inline-block align-text-top mr-0.5 cursor-pointer ${
                currentRating <= (hoverRating || rating)
                  ? 'text-custom_yellow'
                  : 'text-gray-300'
              }`}
            />
          </label>
        );
      })}
    </div>
  );
}
