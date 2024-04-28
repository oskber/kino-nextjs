'use client'

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../lib/actions';

export default function SigninForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    return (
        <>
            <form action={dispatch} className="flex flex-col gap-2">
                <label className="text-white" htmlFor="email">E-postaddress</label>
                <input className="p-2 rounded-md text-black" type="email" id="email" name="email" placeholder="E-postaddress" />
                <label className="text-white" htmlFor="password">Lösenord</label>
                <input className="p-2 rounded-md text-black" type="password" id="password" name="password" placeholder="Lösenord" />
                <Button />
            </form>
            {errorMessage && <p className="text-red-500 text-lg mt-2">{errorMessage}</p>}
        </>
    )
}

const Button = () => {
    const { pending } = useFormStatus();
    return (
        <button className="bg-custom_red px-2 py-1 mt-2 text-white text-xl font-semibold rounded-md hover:opacity-80" type="submit" disabled={pending} aria-disabled={pending}>Logga in</button>
    )
}