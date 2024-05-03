'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
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
    <div className='justify-self-center mb-10 min-w-[400px] relative '>
      <input
        placeholder='Sök på din Bihjofilm!'
        className='w-full h-9 rounded-md text-center'
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className='h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900 absolute left-2 top-1/2 transform -translate-y-1/2' />
    </div>
  );
}
