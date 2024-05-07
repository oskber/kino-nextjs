import SearchModal from '../../components/navigation/SearchBar/searchModal';
import ProfilePage from '../../components/profilepage/profilepage';
export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || '';
  return (
    <main className=''>
      <section className='flex flex-col items-center mt-10 gap-10'>
        <SearchModal query={query} />
        <div className='text-white text-center flex flex-col'>
          <h1 className='text-2xl max-w-sm'>
            Välkommen namn till din personliga BiHjografsida
          </h1>
          <p className='max-w-sm text-sm'>
            Här kan du se dina bokningar, rabatter, köpa presentkort och chatta
            med Hjo's mest framgångsrika skådespelare.
          </p>
        </div>
        <ProfilePage />
      </section>
    </main>
  );
}
