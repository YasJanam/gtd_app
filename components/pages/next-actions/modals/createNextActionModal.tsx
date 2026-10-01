'use client'

import { useState } from "react";
import { getCookie } from "cookies-next";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { toast } from "sonner";
import { Plus } from "flowbite-react-icons/outline";

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

const CreateNextActionModal = ({ show, onClose, onSuccess }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setTitle("");
        setDescription("");
    };

    const handleClose = () => {
        if (loading) return;
        resetForm();
        onClose();
    };

    const createNextAction = async () => {
        if (!title.trim()) {
            toast.error("Add a title so you know what to do.");
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
                    status: "next_action",
                }),
            });

            if (!res.ok) throw new Error("Request failed");

            toast.success("Added to Next Actions.");
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
        <Modal show={show} onClose={handleClose} dismissible>
            <ModalHeader>
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex h-10 w-10 shrink-0 items-center justify-center
                            rounded-xl bg-purple-100 text-purple-600
                        "
                    >
                        <Plus size={20} />
                    </div>

                    <div>
                        <p className="text-base font-bold text-gray-800">
                            New Next Action
                        </p>
                        <p className="mt-0.5 text-xs font-normal text-gray-400">
                            The very next physical step. Start with a verb.
                        </p>
                    </div>
                </div>
            </ModalHeader>

            <ModalBody>
                <div className="space-y-5 pt-2">

                    {/* Title */}
                    <div>
                        <label htmlFor="next-action-title" className={labelClass}>
                            What's the next step?
                        </label>
                        <input
                            id="next-action-title"
                            autoFocus
                            className={inputClass}
                            placeholder="e.g. Call the bank about the card"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") createNextAction();
                            }}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="next-action-desc" className={labelClass}>
                            Description
                            <span className="ml-1 font-normal text-gray-400">
                                (optional)
                            </span>
                        </label>
                        <textarea
                            id="next-action-desc"
                            className={`${inputClass} min-h-[130px] resize-none leading-6`}
                            placeholder="Details, phone numbers, links, what you need first..."
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
                                rounded-xl px-4 py-2 text-sm font-medium
                                text-gray-500 transition hover:bg-gray-100
                                disabled:opacity-50
                            "
                        >
                            Cancel
                        </button>

                        <button
                            onClick={createNextAction}
                            disabled={loading}
                            className="
                                flex items-center gap-2 rounded-xl bg-purple-600
                                px-5 py-2 text-sm font-semibold text-white
                                shadow-md shadow-purple-200 transition
                                hover:bg-purple-700 hover:shadow-lg
                                disabled:opacity-60 disabled:shadow-none
                            "
                        >
                            <Plus size={16} />
                            {loading ? "Adding..." : "Add Next Action"}
                        </button>
                    </div>

                </div>
            </ModalBody>
        </Modal>
    );
};

export default CreateNextActionModal;