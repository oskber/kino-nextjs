import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './bihjografenlogo.png';

const links = [
  { href: '/', name: 'Hem' },
  { href: '/about', name: 'Om oss' },
  { href: '/login', name: 'Logga in' },
  { href: '/create-account', name: 'Skapa konto' },
];

const NavBar = () => {
  return (
    <nav className="flex justify-center top-5 sticky">
      <div className="dark:bg-custom_red w-10/12 rounded-xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-2">
          <div className="relative">
            <Link href="/">
              <Image
                src={Logo}
                alt="Bihjografen"
                width="0"
                height="0"
                className={`w-20 h-auto`}
                unoptimized={true}
                priority={true}
              />
            </Link>
          </div>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-yellow-500 rounded-lg md:hidden hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-200 dark:text-custom_yellow dark:hover:bg-yellow-700 dark:focus:ring-yellow-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false">
            <span className="sr-only">Öppna meny</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto mr-auto ml-auto pr-12"
            id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-red-800 md:dark:bg-transparent">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2 px-3 md:p-0 text-yellow-900 rounded hover:bg-yellow-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 dark:text-white md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
