'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "flowbite-react";

import { TrashBin } from "flowbite-react-icons/outline";
import { getCookie } from "cookies-next";
import { toast } from "sonner";


type Probs = {
    show: boolean,
    onClose: () => void,
    url: string,
    text?: string,
    onSuccess: () => void,
}


const DeleteModal = ({
    show,
    onClose,
    url,
    text = "Are you sure you want to delete this item?",
    onSuccess,

}: Probs) => {

    const token = getCookie('access_token');


    const onClick = async () => {
        try {

            await fetch(`${API_BASE_URL}${url}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(() => onSuccess())
            .then(() => onClose())

        } catch {
            toast.error('Error performing operation')
        }
    }


    return (
        <Modal
            show={show}
            onClose={onClose}
            size="md"
            dismissible
        >

            <ModalHeader>
                <div className="flex items-center gap-3">

                    {/* Icon */}
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-red-50
                            text-red-500
                        "
                    >
                        <TrashBin size={20} />
                    </div>

                    {/* Title */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-800">
                            Delete item
                        </h3>

                        <p className="mt-0.5 text-xs font-normal text-gray-400">
                            This action cannot be undone.
                        </p>
                    </div>

                </div>
            </ModalHeader>


            <ModalBody>

                <div
                    className="
                        rounded-xl
                        border
                        border-red-100
                        bg-red-50/50
                        px-4
                        py-3
                    "
                >
                    <p className="text-sm leading-6 text-gray-600">
                        {text}
                    </p>
                </div>

            </ModalBody>


            <ModalFooter>

                <div className="flex w-full justify-end gap-2">

                    {/* Cancel */}
                    <Button
                        onClick={onClose}
                        color="alternative"
                        className="
                            rounded-xl
                            border-gray-200
                            px-4
                            text-sm
                            font-medium
                            text-gray-600
                            shadow-none
                            hover:bg-gray-50
                        "
                    >
                        Cancel
                    </Button>


                    {/* Delete */}
                    <Button
                        onClick={onClick}
                        className="
                            rounded-xl
                            bg-red-500
                            px-4
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            shadow-red-200
                            transition
                            hover:bg-red-600
                            hover:shadow-md
                        "
                    >
                        <TrashBin size={15} className="mr-1.5" />
                        Delete
                    </Button>

                </div>

            </ModalFooter>

        </Modal>
    )
}

export default DeleteModal;