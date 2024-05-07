'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './bihjografenlogo.png';

type Link = {
  href: string;
  name: string;
};

const links: Link[] = [
  { href: '/', name: 'Hem' },
  { href: '/about', name: 'Om oss' },
  { href: '/login', name: 'Logga in' },
  { href: '/register', name: 'Skapa konto' },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="flex justify-center top-5 sticky">
      <div className="bg-custom_red w-10/12 rounded-xl">
        <div className="flex flex-wrap items-center justify-between p-2">
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
            onClick={handleClick}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-yellow-500 rounded-lg md:hidden hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200  "
            aria-controls="navbar-solid-bg"
            aria-expanded={isOpen}>
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
            className={`${
              isOpen ? 'block' : 'hidden'
            } w-full md:block md:w-auto mr-auto ml-auto text-center`}
            id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleClick}
                    className="block py-2 px-3 md:p-0 rounded hover:bg-custom_yellow focus:bg-custom_yellow md:hover:bg-transparent md:focus:bg-transparent md:border-0 md:hover:text-custom_yellow md:focus:text-custom_yellow text-white ">
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
