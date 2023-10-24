"use client";
import { ReactNode, useEffect, useState } from "react";
import * as controller from "../../utils/api";

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

    return (
        <main className="min-h-screen p-24">
            {Tasks &&
                Tasks.map(
                    (e): ReactNode => (
                        <div key={e.id}>
                            {e.task} {e.completed}
                        </div>
                    )
                )}

            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    name="task"
                    value={formData.task}
                    onChange={changeHandler}
                />
                <input
                    type="checkbox"
                    name="completed"
                    onChange={changeHandler}
                />
                <button type="submit" className="btn ">
                    SUBMIT
                </button>
            </form>
        </main>
    );
}
