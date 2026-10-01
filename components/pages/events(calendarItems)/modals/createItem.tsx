'use client'

import { useState } from "react";
import { getCookie } from "cookies-next";
import { Datepicker, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { CalendarPlus } from "flowbite-react-icons/outline";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
    show: boolean;
    onClose: () => void;
    onSuccess: () => void;
};

const inputClass = `
    w-full rounded-xl border border-gray-200 bg-gray-50
    px-4 py-3 text-sm outline-none transition
    placeholder:text-gray-400
    focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100
`;

const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

/* Without a time, store the date at local noon so timezone conversion can't push it to another day.
   With a time ("HH:mm"), store that exact moment. */
const buildDueDate = (d: Date, time: string) => {
    if (!time) return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12);

    const [h, m] = time.split(":").map(Number);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m);
};

const CreateCalendarItemModal = ({ show, onClose, onSuccess }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setDueDate(new Date());
        setTime("");
    };

    const handleClose = () => {
        if (loading) return;
        resetForm();
        onClose();
    };

    const createCalendarItem = async () => {
        if (!title.trim()) {
            toast.error("Add a title so you know what's scheduled.");
            return;
        }

        try {
            setLoading(true);
            const token = getCookie("access_token");

            const res = await fetch(`${API_BASE_URL}/inbox/items`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title.trim(),
                    description: description.trim(),
                    user: localStorage.getItem("user_id"),
                    status: "calendar",
                    dueDate: buildDueDate(dueDate, time),
                }),
            });

            if (!res.ok) throw new Error("Request failed");

            toast.success("Added to Calendar.");
            onSuccess();
            resetForm();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Couldn't save the item. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            show={show}
            onClose={handleClose}
            dismissible
            className="!items-center"
        >
            <ModalHeader>
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex h-10 w-10 shrink-0 items-center justify-center
                            rounded-xl bg-purple-100 text-purple-600
                        "
                    >
                        <CalendarPlus size={20} />
                    </div>

                    <div>
                        <p className="text-base font-bold text-gray-800">
                            New Calendar Item
                        </p>
                        <p className="mt-0.5 text-xs font-normal text-gray-400">
                            Something that must happen on a specific day.
                        </p>
                    </div>
                </div>
            </ModalHeader>

            <ModalBody >
                <div className="space-y-5 pt-2">

                    {/* Title */}
                    <div>
                        <label htmlFor="calendar-title" className={labelClass}>
                            Title
                        </label>
                        <input
                            id="calendar-title"
                            autoFocus
                            className={inputClass}
                            placeholder="e.g. Dentist appointment, submit report"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") createCalendarItem();
                            }}
                        />
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_9.5rem]">

                        {/* Date */}
                        <div>
                            <label className={labelClass}>Date</label>

                            <div
                                className="
                                    rounded-xl border border-gray-200 bg-gray-50 p-2
                                    transition
                                    focus-within:border-purple-400 focus-within:bg-white
                                    focus-within:ring-4 focus-within:ring-purple-100
                                "
                            >
                                <Datepicker
                                    value={dueDate}
                                    onChange={(date) => {
                                        if (date) setDueDate(date);
                                    }}
                                    minDate={new Date()}
                                    theme={{
                                        root: {
                                            base: "relative w-full",
                                        },
                                        popup: {
                                            root: {
                                                base: "absolute top-10 z-50 block pt-2",
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        {/* Time */}
                        <div>
                            <label htmlFor="calendar-time" className={labelClass}>
                                Time
                                <span className="ml-1 font-normal text-gray-400">
                                    (optional)
                                </span>
                            </label>

                            <div className="relative">
                                <input
                                    id="calendar-time"
                                    type="time"
                                    className={`${inputClass} !py-[0.8rem]`}
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <p className="-mt-3 text-[11px] text-gray-400">
                        Leave the time empty if it can happen any time that day.
                    </p>

                    {/* Description */}
                    <div>
                        <label htmlFor="calendar-desc" className={labelClass}>
                            Description
                            <span className="ml-1 font-normal text-gray-400">
                                (optional)
                            </span>
                        </label>
                        <textarea
                            id="calendar-desc"
                            className={`${inputClass} min-h-[110px] resize-none leading-6`}
                            placeholder="Place, who's involved, what to bring..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
                        <button
                            onClick={handleClose}
                            disabled={loading}
                            className="
                                rounded-xl px-4 py-2.5 text-sm font-medium
                                text-gray-500 transition
                                hover:bg-gray-100 hover:text-gray-700
                                disabled:opacity-50
                            "
                        >
                            Cancel
                        </button>

                        <button
                            onClick={createCalendarItem}
                            disabled={loading}
                            className="
                                flex items-center gap-2 rounded-xl bg-purple-600
                                px-5 py-2.5 text-sm font-semibold text-white
                                shadow-md shadow-purple-200
                                transition-all duration-200
                                hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-lg
                                disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none
                            "
                        >
                            <CalendarPlus size={16} />
                            {loading ? "Adding..." : "Add to Calendar"}
                        </button>
                    </div>

                </div>
            </ModalBody>
        </Modal>
    );
};

export default CreateCalendarItemModal;