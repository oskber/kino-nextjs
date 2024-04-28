'use client'

import Link from 'next/link'
import SigninForm from '../../components/SigninForm';

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full h-screen m-auto">
      <section className="flex flex-col justify-center items-center">
        <SigninForm />
        <p className="text-white text-xl mt-6 mb-2">Inget konto?</p>
        <Link className="text-white font-semibold underline hover:opacity-80" href="/register">Registrera dig här</Link>
      </section>
    </div>
  );
}