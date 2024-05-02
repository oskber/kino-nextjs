import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfilePage = nextUrl.pathname.startsWith('/profile');
      if (isOnProfilePage) {
        if (isLoggedIn) return true;
        return false; 
      } else if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/profile', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;