'use client';

import { addReview } from '../../lib/actions';
import React, { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Button from './Button';
import StarRating from './StarRating';

export default function ReviewForm() {
  const ref = useRef<HTMLFormElement>(null);
  const movieId = usePathname().split('/').pop() ?? '';
  const [rating, setRating] = useState(0);
  return (
    <>
      <form
        ref={ref}
        action={async (formData) => {
          ref.current?.reset();
          await addReview(formData, movieId, rating);
        }}
        className="flex flex-col mb-5 mt-5">
        <h1 className="text-custom_yellow  mb-2 font-bold">
          Vad tyckte du om filmen?
        </h1>
        <input
          type="text"
          name="name"
          className="px-4 py-2 mb-3 rounded text-black"
          placeholder="Namn..."
          required
        />
        <textarea
          name="comment"
          className="px-4 py-2 mb-3 rounded text-black"
          placeholder="Kommentar..."
          required
        />
        <StarRating onRatingChange={setRating} />
        <Button />
      </form>
    </>
  );
}
