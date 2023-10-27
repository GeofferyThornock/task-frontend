"use client";
import { ReactNode, useEffect, useState } from "react";
import * as controller from "../../utils/api";
import Modal from "./modal-form";

export default function Home() {
    interface Task {
        task: string;
        desc?: string;
        completed: boolean;
    }

    const initialFormData: Task = {
        task: "",
        completed: false,
    };

    const [Tasks, setTasks] = useState<any[]>([]);
    const [open, setOpen] = useState<any>(false);

    const loadTasks = () => {
        const abortController = new AbortController();
        controller.listTasks(abortController.signal).then(setTasks);
        return () => abortController.abort();
    };

    useEffect(loadTasks, []);

    let submitHandler = (data: Object) => {
        const abortController = new AbortController();

        controller.createTask(abortController.signal, data).then(loadTasks);

        return () => abortController.abort();
    };

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
        <main className="flex flex-col min-h-screen font-Karla">
            <div className="flex py-5 px-5 m-0 bg-slate-300 text-gray-700 drop-shadow-xl">
                <h1 className="drop-shadow-2xl text-4xl ">TASK</h1>
            </div>

            <div className=" pt-10">
                {Tasks &&
                    Tasks.map(
                        (e): ReactNode => (
                            <div
                                key={e.id}
                                className="flex justify-center gap-1 text-xl"
                            >
                                <input type="checkbox" onChange={checkbox} />
                                <p>{e.task}</p>
                                <p>{e.desc}</p>
                            </div>
                        )
                    )}
            </div>
            <div className="flex justify-center h-96 items-end">
                <button
                    className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 py-5 h-18 rounded-full transition-transform hover:rotate-90 ease-in-out"
                    onClick={() => setOpen(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </button>
            </div>
            <Modal
                open={open}
                setOpen={setOpen}
                handleSubmit={submitHandler}
                initialFormData={initialFormData}
            />
        </main>
    );
}
