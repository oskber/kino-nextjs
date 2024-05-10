import Link from 'next/link';
import SigninForm from '../../components/SigninForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Logga in',
};

export default function Page() {
  return (
    <section className='flex flex-col justify-center items-center w-full h-screen m-auto'>
      <h1 className='text-custom_yellow text-3xl mb-6'>Logga in</h1>
      <SigninForm />
      <p className='text-white text-xl mt-6 mb-2'>Inget konto?</p>
      <Link
        className='text-white font-semibold underline hover:opacity-80'
        href='/register'>
        Registrera dig här
      </Link>
    </section>
  );
}
