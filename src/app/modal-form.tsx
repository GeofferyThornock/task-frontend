"use client";

import React, { useState, useRef, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";

export default function Modal({
    /* @ts-ignore:disable-next-line */
    open,
    /* @ts-ignore:disable-next-line */
    setOpen,
    /* @ts-ignore:disable-next-line */
    handleSubmit,
    /* @ts-ignore:disable-next-line */
    initialFormData,
}) {
    const cancelButtonRef = useRef(null);

    interface Task {
        task: string;
        desc?: string;
        completed: boolean;
    }

    const [formData, setFormData] = useState<Task>(initialFormData);

    const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setOpen(false);
        handleSubmit(formData);
        setFormData(initialFormData);
    };

    let changeHandler = (
        e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        e.preventDefault();

        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <form onSubmit={submitHandler}>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-base font-semibold leading-6 text-gray-900"
                                                >
                                                    Add Task
                                                </Dialog.Title>

                                                <input
                                                    name="task"
                                                    className="shadow appearance-none border rounded py-2 px-3 m-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    placeholder="Name"
                                                    type="text"
                                                    value={formData.task}
                                                    onChange={changeHandler}
                                                />
                                                <textarea
                                                    className="shadow appearance-none w-3/4 py-2 px-3 mx-4 text-sm text-gray-700 rounded border focus:outline-none focus:shadow-outline"
                                                    placeholder="Description: Optional"
                                                    name="desc"
                                                    value={formData.desc}
                                                    onChange={changeHandler}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        >
                                            Create
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
