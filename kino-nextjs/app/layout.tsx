import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/navigation/navbar/Header';
import Footer from './components/navigation/footer/footer';
import { getUser } from './lib/actions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bihjografen',
  description: 'Din Bihjograf i Hjo',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-black`}>
        <Navigation isLoggedIn={!!user} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
