import React from 'react';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Hem</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>Om oss</a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a>Logga in</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
