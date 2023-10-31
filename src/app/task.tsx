import React, { useState } from "react";
/* @ts-ignore:disable-next-line */
export default function Task({ e }) {
    const [Dropdown, setDropdown] = useState<any>(false);

    const checkbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            e.currentTarget.parentElement?.setAttribute(
                "class",
                "flex justify-center gap-1 text-xl line-through decoration-dotted"
            );
        } else {
            e.currentTarget.parentElement?.setAttribute(
                "class",
                "flex justify-center gap-1 text-xl"
            );
        }
    };

    return (
        <div key={e.id} className="flex justify-center gap-1 text-xl">
            <input type="checkbox" onChange={checkbox} />
            <p>{e.task}</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mt-1"
                onClick={() => setDropdown(true)}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
            </svg>
        </div>
    );
}
