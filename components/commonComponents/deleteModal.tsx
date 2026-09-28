'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


import { Modal, ModalHeader,ModalBody,ModalFooter, Button } from "flowbite-react";
import { TrashBin } from "flowbite-react-icons/outline";
import { getCookie } from "cookies-next";
import { toast } from "sonner";


type Probs = {
    show:boolean,
    onClose:() => void,
    url:string,
    text?:string,
    onSuccess:() => void,
}


const DeleteModal = ({
    show,
    onClose,
    url,
    text="Are you sure you want to delete this item?",
    onSuccess,

}:Probs) => {
    const token = getCookie('access_token');


    const onClick = async() => {
        try{
            await fetch(`${API_BASE_URL}${url}`,{
                method:'DELETE',
                headers:{
                    Authorization: `Bearer ${token}` ,
                    'Content-Type': 'application/json',
                }
            }).then(() => onSuccess()).then(() => onClose())
        } catch {
            toast.error('Error performing operation')
        }
    }


    return (<>
        <Modal show={show} onClose={onClose} size="sm" >
            <ModalHeader>
                <TrashBin />
            </ModalHeader>
            <ModalBody>
                <p className="items-center ">{text}</p>
            </ModalBody>
            <ModalFooter>
                <div className="flex gap-4">
                    <Button onClick={onClick} className="bg-red-500 hover:bg-red-700">Delete</Button>
                    <Button onClick={onClose} color={'alternative'}>Cancel</Button>
                </div>
            </ModalFooter>
        </Modal>
    </>)
}

export default DeleteModal;