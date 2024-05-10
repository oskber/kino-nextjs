import SearchDropdown from '../../components/navigation/SearchBar/SearchDropdown';
import ProfilePage from '../../components/profilepage/profilepage';
import { Metadata } from 'next';
// import { getUser } from '../../lib/actions';
export const metadata: Metadata = {
  title: 'Min sida',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || '';
  // const user = await getUser();
  return (
    <main className=''>
      <section className='flex flex-col items-center mt-10 gap-10'>
        <SearchDropdown query={query} />

        <div className='text-white text-center flex flex-col'>
          <h1 className='text-2xl max-w-sm'>
            {/* Välkommen {`${user?.name}`} till din personliga BiHjografsida */}
          </h1>
          <p className='max-w-sm text-sm'>
            Här kan du se dina bokningar, rabatter, köpa presentkort och chatta
            med Hjo's mest framgångsrika skådespelare.
          </p>
        </div>
      </section>
      <ProfilePage />
    </main>
  );
}
