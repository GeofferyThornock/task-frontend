import React, { useState } from "react";
/* @ts-ignore:disable-next-line */
export default function Task({ e }) {
    const [Dropdown, setDropdown] = useState<any>(false);
    const [checkbox, setCheckbox] = useState<any>(false);

    console.log(e);

    return (
        <div
            key={e.id}
            className={`flex flex-wrap mr-3 text-gray-200 justify-center rounded-lg bg-white p-6 shadow-2xl dark:bg-neutral-700
            ${e.priority === 1 ? "order-first text-green-500" : ""}`}
        >
            <input
                className="mr-2"
                type="checkbox"
                onChange={() =>
                    checkbox ? setCheckbox(false) : setCheckbox(true)
                }
            />
            <p className={`mx-2 ${checkbox && "strike"}`}>{e.task}</p>
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
