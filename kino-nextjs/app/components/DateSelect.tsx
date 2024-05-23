"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";

export default function DateSelect() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleDate(date: string) {
        const params = new URLSearchParams(searchParams);
        params.delete("date");
        params.set("date", date);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <>
            <input
                type='date'
                className='text-black font-bold max-w-fit py-2 px-3'
                min={new Date().toISOString().substring(0, 10)}
                defaultValue={new Date().toISOString().substring(0, 10)}
                onChange={(e) => {
                    handleDate(e.target.value);
                }}
                data-cy='screening_date'
            />
        </>
    );
}
