'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

import { useEffect, useState, useMemo } from "react";
import { Plus } from "flowbite-react-icons/outline";
//import api from "@/lib/api";
import { toast } from "sonner";

import { getCookie } from 'cookies-next';

import DeleteModal from "@/components/commonComponents/deleteModal";

import Image from "next/image";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import ReferenceCard from "./referenceCard";
import SearchComponent from "@/components/commonComponents/searchComponent";
import CreateReferenceModal from "./modals/createReference";


type ReferenceType = {
    _id:string
    title:string
    description:string
    user: string,
}


const ReferenceComp = () => {
    //const token = localStorage.getItem('access_token');
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [items,setItems] = useState<ReferenceType[]>([]);

    const token = getCookie('access_token');
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const [deleteItemId,setDeleteItemId] = useState('');
    //const TOKEN = localStorage.getItem('access_token');
    const [showAddItemModal,setShowAddItemModal] = useState(false);
    const [searchTerm,setSearchTerm] = useState('');


    useEffect(() => {
        getMyReference();
    },[])




    const getMyReference = async() => {
        try{
            const res = await fetch(`${API_BASE_URL}/inbox/user-items?status=reference`,{
              method:'GET',
              headers:{
                Authorization: `Bearer ${token}` ,
                'Content-Type': 'application/json',
              }
            })

            const resp = await res.json();
            
            setItems(resp)
            
        }catch {
            console.log('fetching errors')
        }
    }



    const filteredItems = useMemo(() => {
        const safeItems = Array.isArray(items) ? items : [];

        return safeItems.filter((item) => {
            const matchesSearch = item.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());

            return matchesSearch;
        });
    }, [items, searchTerm]);



    return (<>
       <div className="min-h-screen p-5 md:p-8">

        {/* Header */}
        <div className="
            flex flex-col sm:flex-row
            sm:items-center
            justify-between
            gap-4
            mb-8
        ">

            <div>
            <p className="text-sm font-medium text-purple-200 mb-1">
                GTD • Capture
            </p>

            <h1 className="
                text-4xl md:text-5xl
                font-bold
                tracking-tight
                text-white
            ">
                Reference
            </h1>

            <p className="mt-2 text-sm text-purple-100/70">
                Capture everything before you decide what to do with it.
            </p>
            </div>

            <Button
            onClick={() => setShowAddItemModal(true)}
            size="sm"
            className="
                self-start sm:self-auto
                flex items-center gap-2
                rounded-xl
                bg-white
                px-4 py-2.5
                font-semibold
                text-purple-700
                shadow-lg
                shadow-purple-950/20
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-purple-50
                hover:shadow-xl
            "
            >
            <Plus size={17} />
            New Reference
            </Button>

        </div>


        <SearchComponent searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredItems={filteredItems}
        />


        {/* Inbox stats / decorative bar */}
        <div className="
            mb-7
            flex flex-wrap
            items-center
            gap-3
        ">

            <div className="
            rounded-xl
            border border-white/10
            bg-white/10
            px-4 py-2
            backdrop-blur-md
            ">
            <span className="text-xs text-purple-200">
                References
            </span>

            <span className="ml-2 font-bold text-white">
                {filteredItems?.length || 0}
            </span>
            </div>

            <div className="
            h-px
            flex-1
            bg-gradient-to-r
            from-white/20
            to-transparent
            "/>

        </div>


        {/* Cards */}
        {/*
            sm:grid-cols-2
            lg:grid-cols-3
        */}

        <div className="
            grid
            grid-cols-1
            
            gap-5
            pb-10
        ">

            {items && items.length > 0 ? (

            filteredItems.map((item) => (

                <ReferenceCard
                key={item._id}
                id={item._id}
                title={item.title}
                description={item.description}
                onDelete={() => {
                    setDeleteItemId(item._id)
                    setShowDeleteModal(true)
                }}
                />

            ))

            ) : (

            /* Empty state */
            <div className="
                col-span-full
                flex
                min-h-[300px]
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-dashed
                border-white/20
                bg-white/5
                text-center
                backdrop-blur-sm
            ">

                <div className="
                mb-4
                flex h-16 w-16
                items-center justify-center
                rounded-2xl
                bg-purple-500/20
                text-3xl
                ">
                ✦
                </div>

                <h3 className="text-lg font-semibold text-white">
                    Your references are clear.
                </h3>

                <p className="mt-2 max-w-sm text-sm text-purple-100/60">
                See what needs to be done and take the very next step.
                </p>

                <button
                onClick={() => setShowAddItemModal(true)}
                className="
                    mt-5
                    rounded-xl
                    bg-purple-600
                    px-4 py-2
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-purple-500
                "
                >
                + Add your first item
                </button>

            </div>

            )}

        </div>


        {/* Delete Modal */}
        <DeleteModal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            url={`/inbox/items/${deleteItemId}`}
            onSuccess={getMyReference}
        />


        {/* Add Item Modal */}
        <CreateReferenceModal
        show={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        onSuccess={getMyReference}
        />


        </div>
    </>);
}

export default ReferenceComp;