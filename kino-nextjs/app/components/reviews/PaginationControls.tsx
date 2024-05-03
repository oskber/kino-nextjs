'use client';

import { FC } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get('page') ?? '1';
  const itemsPerPage = searchParams.get('per_page') ?? '5';

  return (
    <div className="flex gap-1 justify-center mt-2">
      <button
        className={`p-1 pr-2 pl-2 rounded cursor-pointer hover:opacity-70 ${
          !hasNextPage ? 'bg-custom_yellow text-white' : 'bg-gray-500'
        }`}
        disabled={!hasPrevPage}
        onClick={() => {
          console.log('clicked framåt');
          router.push(
            `${pathname}?page=${Number(page) - 1}&per_page=${itemsPerPage}`,
            { scroll: false }
          );
        }}>
        {'<'}
      </button>

      <div>
        {page} / {Math.ceil(10 / Number(itemsPerPage))}
      </div>

      <button
        className={`p-1 pr-2 pl-2 rounded cursor-pointer hover:opacity-70 ${
          !hasNextPage ? 'bg-gray-500' : 'bg-custom_yellow text-white'
        }`}
        disabled={!hasNextPage}
        onClick={() => {
          console.log('clicked framåt');
          router.push(
            `${pathname}?page=${Number(page) + 1}&per_page=${itemsPerPage}`,
            { scroll: false }
          );
        }}>
        {'>'}
      </button>
    </div>
  );
};

export default PaginationControls;
