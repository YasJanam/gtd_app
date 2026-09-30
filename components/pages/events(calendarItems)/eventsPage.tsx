'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

import { useEffect, useMemo, useState } from "react";
import { Plus } from "flowbite-react-icons/outline";
//import api from "@/lib/api";
import { toast } from "sonner";

import { getCookie } from 'cookies-next';

import DeleteModal from "@/components/commonComponents/deleteModal";

import Image from "next/image";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import CalendarItemCard from "./eventCard";
import CreateCalendarItemModal from "./modals/createItem";



type EventType = {
    _id:string
    title:string
    description:string
    user: string,
    status:string,
    dueDate:Date | string,
}


const CalendarItemsComp = () => {
    const [items,setItems] = useState<EventType[]>([]);

    const token = getCookie('access_token');
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const [deleteItemId,setDeleteItemId] = useState('');
    //const TOKEN = localStorage.getItem('access_token');
    const [showAddItemModal,setShowAddItemModal] = useState(false);

    const [searchTerm,setSearchTerm] = useState('');


    useEffect(() => {
        getMyCalendarItems();
    },[])


    const getMyCalendarItems = async() => {
        try{
            const res = await fetch(`${API_BASE_URL}/inbox/user-items?status=calendar`,{
              method:'GET',
              headers:{
                Authorization: `Bearer ${token}` ,
                'Content-Type': 'application/json',
              }
            })

            const resp = await res.json();
            //console.log(resp)
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
                Calendar Items
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
            New Calendar Item
            </Button>

        </div>




        {/* Search */}
<div className="mb-6">
    <div
        className="
            group
            relative
            flex
            w-full
            items-center
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-white/[0.07]
            shadow-[0_8px_30px_rgba(0,0,0,0.12)]
            transition-all
            duration-300
            focus-within:border-purple-300/40
            focus-within:bg-white/[0.10]
            focus-within:shadow-[0_8px_35px_rgba(168,85,247,0.12)]
        "
    >

        {/* Search icon */}
        <div
            className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                text-purple-200/60
                transition
                group-focus-within:text-purple-300
            "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
            </svg>
        </div>


        {/* Input */}
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search calendar items..."
            className="
                min-w-0
                flex-1
                bg-transparent
                py-3
                pr-3
                text-sm
                text-white
                outline-none
                placeholder:text-purple-100/40
            "
        />


        {/* Clear */}
        {searchTerm && (
            <button
                onClick={() => setSearchTerm("")}
                className="
                    mr-2
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    text-purple-200/50
                    transition
                    hover:bg-white/10
                    hover:text-white
                "
                title="Clear search"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6l12 12M18 6 6 18"
                    />
                </svg>
            </button>
        )}

    </div>


    {/* Search result info */}
    {searchTerm && (
        <div className="mt-2 flex items-center gap-2 px-2">
            <span className="text-xs text-purple-200/50">
                Searching for
            </span>

            <span className="max-w-[200px] truncate text-xs font-medium text-purple-200">
                "{searchTerm}"
            </span>

            <span className="text-xs text-purple-200/40">
                •
            </span>

            <span className="text-xs text-purple-200/50">
                {filteredItems.length} result
                {filteredItems.length !== 1 ? "s" : ""}
            </span>
        </div>
    )}
</div>


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
                Calendar Items
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

                <CalendarItemCard
                key={item._id}
                id={item._id}
                title={item.title}
                description={item.description}
                dueDate={item.dueDate}
                status={item.status}
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
                    Your calendar items are clear.
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
            onSuccess={getMyCalendarItems}
        />


        {/* Add Calendar Item Modal */}
        <CreateCalendarItemModal
        show={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        onSuccess={() => {getMyCalendarItems();}}
        />


        </div>
    </>);
}

export default CalendarItemsComp;