'use server'

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { State } from '../lib/definitions';
import { userModel } from './schema.js';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { MongoError } from 'mongodb';

export async function createUser(prevState: State | undefined, formData: FormData) {
  const { name, lastname, email, password, password2 } = Object.fromEntries(formData);
  const passwordsMatch = password === password2;
  let success = false;
  try {
    const hashedPassword = password.toString().length > 5 ? await bcrypt.hash(password.toString(), 10) : '';
    const user = new userModel({ name, lastname, email, password: hashedPassword });
    await user.validate();
    if(!passwordsMatch) throw new Error();
    await user.save();
    success = true; // Redirect can't be called in a try block so used boolean to check if user was created successfully
  } catch (error) {
    const errors: Array<string> = [];
    if (!passwordsMatch) errors.push('Lösenorden matchar inte')
    if (error instanceof mongoose.Error.ValidationError) {
      for (const field in error.errors) {
        errors.push(error.errors[field].message);
      }
    } else if (error instanceof MongoError && error.code === 11000) {
      errors.push('E-postadressen är redan registrerad.');
    }
    return { ...prevState, errors };
  }
  if (success) redirect('/login');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const { email, password } = Object.fromEntries(formData);
    if (!email || !password) {
      return 'Fyll i e-postadress och lösenord.';
    }
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Felaktig e-postaddress eller lösenord.';
        default:
          return 'Något gick fel.';
      }
    }
    throw error;
  }
}