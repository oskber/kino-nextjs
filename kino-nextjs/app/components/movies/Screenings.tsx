import Link from 'next/link';
import { screening } from '../../lib/types';
import DateSelect from '../DateSelect';
import { fetchFilteredScreenings } from '../../lib/data';

export default async function Screenings({ id, date }: { id: string; date: string | undefined }) {
  let screenings: screening[];
  if (!date) {
    const today = new Date().toISOString().substring(0, 10);
    screenings = await fetchFilteredScreenings(id, today);
  } else {
    screenings = await fetchFilteredScreenings(id, date);
  }

  return (
    <section className='grid justify-self-stretch row-start-2'>
      <div className='text-white bg-custom_red m-10 p-10 rounded-lg w-3/4 max-w-xl justify-self-center'>
        <h2 className='font-bold text-xl mb-3'>Välj datum och tid för att boka biljett!</h2>
        <DateSelect />
        <ul className='mt-3 p-0'>
          {screenings.length == 0 && (
            <li className='font-bold text-custom_yellow'>
              Tyvärr finns det inga visningar under valt datum.
            </li>
          )}
          {screenings?.map((screening: screening, index) => (
            <li key={index}>
              <div className=' p-3 flex justify-between items-center rounded-sm'>
                <p className='font-bold'>{screening.Date.substring(11, 16)}</p>
                <Link
                  className='bg-custom_yellow font-bold py-1 px-4 rounded-sm ml-10 hover:bg-amber-500'
                  href={{
                    pathname: `${id}/seats`,
                    query: JSON.parse(JSON.stringify(screening._id)),
                  }}
                >
                  Boka
                </Link>
              </div>
              <hr className='border-white border-[1.5px]' />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
