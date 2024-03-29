"use client";
import { ReactNode, useEffect, useState, KeyboardEvent } from "react";
import { Draggable } from "@shopify/draggable";
import * as controller from "../../utils/api";
import { DateTime } from "luxon";
import Modal from "./modal-form";
import Task from "./task";

//a way of preserving daily tasks thruoiughtt days (with cookies maybe?)

export default function Home() {
    interface Task {
        task: string;
        desc?: string;
        priority?: number;
        completed: boolean;
    }

    const initialFormData: Task = {
        task: "",
        completed: false,
    };

    const [Tasks, setTasks] = useState<any[]>([]);
    const [open, setOpen] = useState<any>(false);
    const [dropdown, setDropdown] = useState<any>(false);
    const [date, setDate] = useState<String>();

    const keyboard = (e: KeyboardEvent): void => {
        if (e.key === "T" && open === false) {
            setOpen(true);
        }
    };

    const loadTasks = () => {
        const abortController = new AbortController();
        controller
            .listTasks(abortController.signal)
            .then(setTasks)
            .catch(console.log);

        setDate(DateTime.now().toLocaleString(DateTime.DATE_MED));
        return () => abortController.abort("could not list");
    };

    useEffect(() => {
        loadTasks();
        /* @ts-ignore:disable-next-line */
        window.addEventListener("keydown", keyboard);
    }, []);

    let submitHandler = (data: Task) => {
        const abortController = new AbortController();
        const { task, desc } = data;

        if (task.slice(0, 1) === "$") {
            data.priority = 1;
            data.task = task.slice(1);
        }

        if (task.includes("(") && task.includes(")")) {
            let arr = task.match(/[^\/\(\)]+/g)?.map((e): Task => {
                return { task: e.trim(), completed: false };
            });

            if (desc) {
                desc?.match(/[^\/\(\)]+/g)?.forEach((e) => {
                    let newArr = e?.match(/\[[0-9-]+\]/g);
                    /* @ts-ignore:disable-next-line */
                    let num = parseInt(newArr[0]?.match(/[\d]+/g));
                    /* @ts-ignore:disable-next-line */
                    if (num > arr.length && num <= 0) return;
                    /* @ts-ignore:disable-next-line */
                    arr[num - 1].desc = e.trim().slice(0, -3);
                });
            }

            //this is a description for the 3rd task[3]
            /* @ts-ignore:disable-next-line */
            controller.createTask(abortController.signal, arr).then(loadTasks);
            return () => abortController.abort();
        }

        controller.createTask(abortController.signal, data).then(loadTasks);

        return () => abortController.abort();
    };

    return (
        <main className="flex flex-col min-h-screen font-Karla">
            <div className="flex py-5 px-5 m-0 bg-slate-300 text-gray-700 drop-shadow-xl">
                <h1 className="drop-shadow-2xl text-4xl ">TASK</h1>
                <p>{date?.toString()}</p>
            </div>
            <div className="mouse-drag flex flex-wrap flex-col content-center justify-center items-center gap-3 pt-10">
                {Tasks && Tasks.map((e): ReactNode => <Task e={e} />)}
            </div>
            <div className="flex justify-center h-96 items-end">
                <button
                    className="sticky bottom-5 z-10 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 py-5 h-18 rounded-full transition-transform hover:rotate-90 ease-in-out"
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
