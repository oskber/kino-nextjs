import SearchDropdown from '../../components/navigation/SearchBar/SearchDropdown';
import ProfilePage from '../../components/profilepage/profilepage';
import { Metadata } from 'next';
import { getUser } from '../../lib/actions';
export const metadata: Metadata = {
  title: 'Min sida',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || '';
  const user = await getUser();
  return (
    <main className=''>
      <section className='flex flex-col items-center mt-10 gap-10'>
        <SearchDropdown query={query} />

        <div className='text-white text-center flex flex-col gap-1'>
          <h1 className='text-2xl md:text-4xl'>
            Välkommen {`${user?.name || 'gäst'} `} till din personliga
            BiHjografsida
          </h1>
          <p className='md:max-w-sm text-sm md:text-xl self-center'>
            Här kan du se dina bokningar, rabatter, köpa presentkort och chatta
            med Hjos mest framgångsrika skådespelare.
          </p>
        </div>
      </section>
      {user ? (
        <ProfilePage userData={user} />
      ) : (
        <section className='text-red-700 text-2xl flex justify-center border-t-2 border-custom_yellow mt-5 animate-bounce'>
          <p>
            Kunde inte ladda dina uppgifter. Prova att Uppdatera sidan. status
            500.
          </p>
        </section>
      )}
    </main>
  );
}
