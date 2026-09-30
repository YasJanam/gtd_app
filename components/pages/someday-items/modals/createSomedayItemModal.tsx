'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


import { useState } from "react";
import { getCookie } from "cookies-next";
import {
 // Button,
//  Datepicker,
  Modal,
  ModalBody,
 // ModalFooter,
  ModalHeader
} from "flowbite-react";
import { toast } from "sonner";
import { Plus } from "flowbite-react-icons/outline";



type Probs = {
    show:boolean,
    onClose:() => void,
    onSuccess:() => void,
}


const CreateSomedayItemModal = ({show,onClose,onSuccess}:Probs) => {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const token = getCookie('access_token');


    const resetDatas = () => {
        setTitle('');
        setDescription('');
    }

     const createSomedayItem = async() => {
        if(title === '') {
            toast.error('title is none!');
            return;
        }

        try{
            await fetch(`${API_BASE_URL}/inbox/items`,{
                method:'POST',
                headers:{
                    Authorization: `Bearer ${token}` ,
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify({
                    title:title,
                    description:description,
                    user: localStorage.getItem('user_id'),
                    status: 'someday',
                })
            }).then(() => {onSuccess();resetDatas();onClose()})
        } catch {
            toast.error('error in item creation')
        }
    }



    return (<>
           <Modal
            show={show}
            onClose={onClose}
            dismissible
        >

            <ModalHeader>
            <div className="flex items-center gap-2">
                <div className="
                flex h-8 w-8
                items-center justify-center
                rounded-lg
                bg-purple-100
                text-purple-600
                ">
                <Plus size={18} />
                </div>

                <div>
                <p className="font-bold text-gray-800">
                    New Reference
                </p>

                <p className="text-xs font-normal text-gray-400">
                    Choose the next step. Take it.
                </p>
                </div>
            </div>
            </ModalHeader>


            <ModalBody>

            <div className="space-y-5 pt-3">

                {/* Title */}
                <div>
                <label className="
                    mb-2 block
                    text-sm font-semibold
                    text-gray-700
                ">
                    Title
                </label>

                <input
                    className="
                    w-full
                    rounded-xl
                    border border-gray-200
                    bg-gray-50
                    px-4 py-3
                    text-sm
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-purple-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-purple-100
                    "
                    placeholder="What is on your mind?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                </div>


                {/* Description */}
                <div>
                <label className="
                    mb-2 block
                    text-sm font-semibold
                    text-gray-700
                ">
                    Description
                </label>

                <textarea
                    className="
                    min-h-[130px]
                    w-full
                    resize-none
                    rounded-xl
                    border border-gray-200
                    bg-gray-50
                    px-4 py-3
                    text-sm
                    leading-6
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-purple-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-purple-100
                    "
                    placeholder="Add some details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>


                {/* Footer */}
                <div className="
                flex
                justify-end
                gap-2
                border-t
                border-gray-100
                pt-4
                ">

                <button
                    onClick={onClose}
                    className="
                    rounded-xl
                    px-4 py-2
                    text-sm
                    font-medium
                    text-gray-500
                    transition
                    hover:bg-gray-100
                    "
                >
                    Cancel
                </button>

                <button
                    onClick={createSomedayItem}
                    className="
                    flex items-center gap-2
                    rounded-xl
                    bg-purple-600
                    px-5 py-2
                    text-sm
                    font-semibold
                    text-white
                    shadow-md
                    shadow-purple-200
                    transition
                    hover:bg-purple-700
                    hover:shadow-lg
                    "
                >
                    <Plus size={16} />
                    Add Item
                </button>

                </div>

            </div>

            </ModalBody>

        </Modal>
    </>)
}


export default CreateSomedayItemModal;