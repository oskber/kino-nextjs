'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchMovies() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  }, 600);
  return (
    <>
      <label
        htmlFor='searchMovies'
        className='flex flex-row gap-1 text-custom_yellow self-center md:self-start'
      >
        Sök på din Bihjofilm!
        <MagnifyingGlassIcon className='w-5 h-5' />
      </label>
      <input
        id='searchMovies'
        placeholder='Sök på din Bihjofilm!'
        className='w-[350px] h-9 justify-self-center rounded-lg pl-2'
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </>
  );
}
