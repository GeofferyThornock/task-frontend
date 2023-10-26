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
    const [formData, setFormData] = useState<Task>(initialFormData);
    const [open, setOpen] = useState<any>(false);

    const loadTasks = () => {
        const abortController = new AbortController();
        controller.listTasks(abortController.signal).then(setTasks);
        return () => abortController.abort();
    };

    useEffect(loadTasks, []);

    let submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const abortController = new AbortController();

        controller.createTask(abortController.signal, formData).then(loadTasks);

        setFormData(initialFormData);

        console.log(formData);
        return () => abortController.abort();
    };

    let changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.checked);
        if (e.currentTarget.name === "completed" && e.currentTarget.checked) {
            setFormData({
                ...formData,
                completed: true,
            });
            console.log("true");
        } else if (
            e.currentTarget.name === "completed" &&
            !e.currentTarget.checked
        ) {
            setFormData({
                ...formData,
                completed: false,
            });
        } else {
            setFormData({
                ...formData,
                [e.currentTarget.name]: e.currentTarget.value,
            });
        }
    };

    const checkbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            e.currentTarget.parentElement?.setAttribute(
                "class",
                "flex gap-5 line-through"
            );
        } else {
            e.currentTarget.parentElement?.setAttribute("class", "flex gap-5 ");
        }
    };

    return (
        <main className="flex flex-col min-h-screen p-2">
            {Tasks &&
                Tasks.map(
                    (e): ReactNode => (
                        <div key={e.id} className="flex justify-center gap-1">
                            <input type="checkbox" onChange={checkbox} />
                            <p>{e.task}</p>
                            <p>{e.desc}</p>
                        </div>
                    )
                )}
            <div className="flex justify-center sticky bottom-0">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 py-5 rounded-full"
                    onClick={() => setOpen(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>
            </div>
            <Modal open={open} setOpen={setOpen} />
        </main>
    );
}
