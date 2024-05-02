import React from 'react';
import { useFormStatus } from 'react-dom';

export default function Button() {
  const { pending } = useFormStatus();

  return (
    <button className="bg-custom_yellow hover:bg-yellow-400 text-white rounded px-4 py-2 mt-3">
      {pending ? 'Skickar...' : 'Skicka'}
    </button>
  );
}
