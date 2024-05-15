import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import type { DbUser } from './app/lib/definitions';
import bcrypt from 'bcrypt';
import { userModel } from './app/lib/schema';
import 'dotenv/config';

async function getUserByEmail(email: string): Promise<DbUser | undefined> {
    try {
        const user = await userModel.findOne({ email });
        return user;
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const { email, password } = credentials;
                if (typeof email !== 'string' || typeof password !== 'string') {
                    throw new Error('Invalid input');
                }
                const user = await getUserByEmail(email);
                if (!user) {
                    throw new Error('No user found');
                }
                const isValid = await bcrypt.compare(password, user.password);
                if (!isValid) {
                    throw new Error('Invalid password')
                }
                return { email: user.email, name: user.name };
            },
        }),
    ],
});