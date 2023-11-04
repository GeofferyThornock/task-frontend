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
        <div
            key={e.id}
            className="flex flex-wrap mr-3 justify-center rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
        >
            <input className="mr-2" type="checkbox" onChange={checkbox} />
            <p className="mx-2">{e.task}</p>
            {e.desc && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 h-4 mt-1  transition-transform ease-in ${
                        Dropdown && "-rotate-180"
                    }`}
                    onClick={() => {
                        Dropdown ? setDropdown(false) : setDropdown(true);
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                </svg>
            )}

            {Dropdown && (
                <p className="basis-full text-center transition-opacity opacity-100">
                    {e.desc}
                </p>
            )}
        </div>
    );
}
