"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="mt-20 grid justify-center min-h-screen">
            <section className="flex flex-col items-center">
                <h2 className="text-center font-bold">Något gick fel.</h2>
                <button
                    className="mt-4 rounded-md bg-custom_red px-4 py-2 font-bold text-custom_yellow transition-colors hover:bg-red-800"
                    onClick={() => reset()}
                >
                    Försök igen.
                </button>
            </section>
        </main>
    );
}
