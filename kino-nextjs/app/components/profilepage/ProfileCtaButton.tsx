'use client';
import React from 'react';
type HandleClickType = (event: React.MouseEvent<HTMLButtonElement>) => void;
interface ProfilePageButton {
  handleClick: HandleClickType;
  name: string;
}

export default function ProfilePageButton({
  handleClick,
  name,
}: ProfilePageButton) {
  return (
    <button
      className='bg-custom_yellow hover:bg-yellow-900 text-white font-bold py-1 px-3 rounded-full'
      onClick={handleClick}
    >
      {name}
    </button>
  );
}
