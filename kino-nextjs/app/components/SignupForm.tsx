'use client';

import { createUser } from '../lib/actions';
import { useFormState, useFormStatus } from 'react-dom';


export default function SignupForm() {
    const initialState = { success: false, errors: [] };
    const [state, dispatch] = useFormState(createUser, initialState);
    return (
        <form action={dispatch} className="flex flex-col">
            <div className="flex items-center gap-2">
                <div className="flex flex-col">
                    <label className="text-white" htmlFor="name">Namn</label>
                    <input className="p-2 my-2 rounded-md text-black" type="text" id="name" name="name" placeholder="Namn" />
                </div>
                <div className="flex flex-col">
                    <label className="text-white" htmlFor="lastname">Efternamn</label>
                    <input className="p-2 my-2 rounded-md text-black" type="text" id="lastname" name="lastname" placeholder="Efternamn" />
                </div>
            </div>
            <label className="text-white" htmlFor="email">E-postaddress</label>
            <input className="p-2 my-2 rounded-md text-black" type="text" id="email" name="email" placeholder="E-postaddress" />
            <label className="text-white" htmlFor="password">Lösenord</label>
            <input className="p-2 my-2 rounded-md text-black" type="password" id="password" name="password" placeholder="Lösenord" />
            <div id="password-strength" className="hidden">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <label className="text-white" htmlFor="password2">Bekräfta lösenord</label>
            <input className="p-2 my-2 rounded-md text-black" type="password" id="password2" name="password2" placeholder="Bekräfta lösenord" />
            {state?.errors && state?.errors.length > 0 && state.errors.map((error) => {
                return (
                    <p key={error} className="text-red-500 text-center">{error}</p>
                )
            })}
            <Button />
        </form>
    )
}

const Button = () => {
    const { pending } = useFormStatus();
    return (
        <button className="bg-custom_red px-2 py-1 mt-2 text-white text-xl font-semibold rounded-md hover:opacity-80" type="submit" disabled={pending} aria-disabled={pending}>Logga in</button>
    )
}