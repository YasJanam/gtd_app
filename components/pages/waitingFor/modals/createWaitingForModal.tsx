'use client'

import { useState } from "react";
import { getCookie } from "cookies-next";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Clock } from "flowbite-react-icons/outline";
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

const CreateWaitingForModal = ({ show, onClose, onSuccess }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [delegatedTo, setDelegatedTo] = useState("");
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setDelegatedTo("");
    };

    const handleClose = () => {
        if (loading) return;
        resetForm();
        onClose();
    };

    const createWaitingForItem = async () => {
        if (!title.trim()) {
            toast.error("Add a title so you remember what you're waiting for.");
            return;
        }

        if (!delegatedTo.trim()) {
            toast.error("Add who you're waiting for.");
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
                    status: "waiting_for",
                    delegatedTo: delegatedTo.trim(),
                }),
            });

            if (!res.ok) throw new Error("Request failed");

            toast.success("Added to Waiting For.");
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
                        <Clock size={20} />
                    </div>

                    <div>
                        <p className="text-base font-bold text-gray-800">
                            New Waiting For
                        </p>
                        <p className="mt-0.5 text-xs font-normal text-gray-400">
                            Track something someone else owes you.
                        </p>
                    </div>
                </div>
            </ModalHeader>

            <ModalBody className="overflow-visible">
                <div className="space-y-5 pt-2">

                    {/* Title */}
                    <div>
                        <label htmlFor="wf-title" className={labelClass}>
                            What are you waiting for?
                        </label>
                        <input
                            id="wf-title"
                            autoFocus
                            className={inputClass}
                            placeholder="e.g. Signed contract, design mockups"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") createWaitingForItem();
                            }}
                        />
                    </div>

                    {/* Delegated to */}
                    <div>
                        <label htmlFor="wf-person" className={labelClass}>
                            Who has it?
                        </label>
                        <input
                            id="wf-person"
                            className={inputClass}
                            placeholder="Person or team"
                            value={delegatedTo}
                            onChange={(e) => setDelegatedTo(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") createWaitingForItem();
                            }}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="wf-desc" className={labelClass}>
                            Notes
                            <span className="ml-1 font-normal text-gray-400">
                                (optional)
                            </span>
                        </label>
                        <textarea
                            id="wf-desc"
                            className={`${inputClass} min-h-[100px] resize-none leading-6`}
                            placeholder="When you asked, what was agreed, when to follow up..."
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
                            onClick={createWaitingForItem}
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
                            <Clock size={16} />
                            {loading ? "Adding..." : "Add to Waiting For"}
                        </button>
                    </div>

                </div>
            </ModalBody>
        </Modal>
    );
};

export default CreateWaitingForModal;