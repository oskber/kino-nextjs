import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import test from 'node:test';
import { ChangeEventHandler } from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';

export default function SearchMovies() {
  return (
    <div className=' mb-4 flex flex-row'>
      <div>
        <MagnifyingGlassIcon className='h-10 w-10 ' />
      </div>
      <input className='text-black' type='text' />
    </div>
  );
}
// handleChange: ChangeEventHandler<HTMLInputElement>
