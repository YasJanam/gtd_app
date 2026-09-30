'use client'

import { useState } from "react";
import { Plus } from "flowbite-react-icons/outline";
import { Modal, ModalHeader, ModalBody } from "flowbite-react";


type Probs = {
    show:boolean,
    onClose:() => void,
}

const CreateProjectModal = ({show,onClose}:Probs) => {
    const [name,setName] = useState("");
    const [notes,setNotes] = useState("");

    return (<>
    {/* Create Project Modal */}
    <Modal
    show={show}
    onClose={onClose}
    className="!items-center"
    >

    <ModalHeader>
        <div className="flex items-center gap-3">

        {/* Icon */}
        <div
            className="
            flex
            h-10 w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-purple-100
            text-purple-600
            "
        >
            <Plus size={20} />
        </div>

        {/* Title */}
        <div>
            <p className="text-base font-bold text-gray-800">
            New Project
            </p>

            <p className="mt-0.5 text-xs text-gray-400">
            Create a project and define what you want to achieve.
            </p>
        </div>

        </div>
    </ModalHeader>


    <ModalBody>

        <div className="space-y-5 pt-2">

        {/* Project Name */}
        <div>

            <label
            className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
            "
            >
            Project name
            </label>

            <input
            className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                text-sm
                text-gray-800
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-purple-400
                focus:bg-white
                focus:ring-4
                focus:ring-purple-100
            "
            placeholder="e.g. Launch my website"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

        </div>


        {/* Notes */}
        <div>

            <label
            className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
            "
            >
            Project notes
            </label>

            <textarea
            className="
                min-h-[120px]
                w-full
                resize-none
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                text-sm
                leading-6
                text-gray-800
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-purple-400
                focus:bg-white
                focus:ring-4
                focus:ring-purple-100
            "
            placeholder="What is this project about?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            />

        </div>


        {/* Footer */}
        <div
            className="
            flex
            justify-end
            gap-2
            border-t
            border-gray-100
            pt-4
            "
        >

            {/* Cancel */}
            <button
            onClick={() => {
                onClose();
                setName("");
                setNotes("");
            }}
            className="
                rounded-xl
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-500
                transition
                hover:bg-gray-100
                hover:text-gray-700
            "
            >
            Cancel
            </button>


            {/* Create */}
            <button
            onClick={() => {
                // createProject()
            }}
            className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-purple-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-md
                shadow-purple-200
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-purple-700
                hover:shadow-lg
            "
            >
            <Plus size={16} />
            Create Project
            </button>

        </div>

        </div>

    </ModalBody>

    </Modal>
    </>)
}


export default CreateProjectModal;