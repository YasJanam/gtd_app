'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


import { useState } from "react";
import { getCookie } from "cookies-next";
import {
  Button,
  Datepicker,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "flowbite-react";

import { CalendarPlus } from "flowbite-react-icons/outline";
import { toast } from "sonner";


type Probs = {
    show:boolean,
    onClose:() => void,
    onSuccess:() => void,
}

const CreateCalendarItemModal = ({show,onClose,onSuccess}:Probs) => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [dueDate,setDueDate] = useState(new Date());
    const token = getCookie('access_token');


    const resetDatas = () => {
        setTitle('');
        setDescription('');
        setDueDate(new Date());
    }

     const createCalendarItem = async() => {
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
                    status: 'calendar',
                    dueDate: dueDate,
                })
            }).then(() => {onSuccess();resetDatas();onClose()})
        } catch {
            toast.error('error in item creation')
        }
    }

    return (<>
    
    {/* Add Calendar Item Modal */}
<Modal
  show={show}
  onClose={onClose}
  dismissible
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
          items-center justify-center
          rounded-xl
          bg-purple-100
          text-purple-600
        "
      >
        <CalendarPlus size={20} />
      </div>

      {/* Title */}
      <div>

        <p className="text-base font-bold text-gray-800">
          New Calendar Item
        </p>

        <p className="mt-0.5 text-xs font-normal text-gray-400">
          Schedule it and give it a specific time.
        </p>

      </div>

    </div>

  </ModalHeader>


  <ModalBody className="overflow-visible">

    <div className="space-y-5 pt-2">


      {/* Title */}
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
          placeholder="What needs to happen?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      </div>


      {/* Date */}
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
          Date
        </label>

        <div
          className="
            rounded-xl
            border border-gray-200
            bg-gray-50
            p-2
            transition
            focus-within:border-purple-400
            focus-within:bg-white
            focus-within:ring-4
            focus-within:ring-purple-100
          "
        >

          <Datepicker
            value={dueDate}
            onChange={(e) => setDueDate(e as any)}
            
            minDate={new Date()}
            //label=""
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

        <p className="mt-1.5 text-[11px] text-gray-400">
          When do you want this item to happen?
        </p>

      </div>


      {/* Description */}
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
          Description
        </label>

        <textarea
          className="
            min-h-[110px]
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
          onClick={onClose}
          className="
            rounded-xl
            px-4 py-2.5
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


        {/* Add */}
        <button
          onClick={() => createCalendarItem()}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-purple-600
            px-5 py-2.5
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
          <CalendarPlus size={16} />
          Add to Calendar
        </button>

      </div>

    </div>

  </ModalBody>

</Modal>
    </>)
}


export default CreateCalendarItemModal;