'use client'

import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useRouter } from "next/navigation"
import { useState } from "react";
import AiResponse from "@/components/commonComponents/aiResponse";
import AiRecommandationModal from "./modals/aiRecommdandationModal";

type Probs = {
    id:string,
    title: string,
    description:string,
    status:string
    onDelete:() => void,

}

const InboxItemCard = ({id,title,description,onDelete,status}:Probs) => {
    const router = useRouter();
    const [showAll,setShowAll] = useState(false);

    const [recommandedType,setRecommandedType] = useState({
        type:'',
        reason:''
    });
    const [aiLoading,setAiLoading] = useState(false);

    const [showTypeReason,setShowTypeReason] = useState(false)

    const recommandItemTypeByAi = async () => {
        try {
            setAiLoading(true);
            const response = await fetch('/api/ai/recommand-item-type', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                description: description,
            }),
            });

            if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'خطا در تولید');
            }

            const data = await response.json();
            console.log(data.actions); 
            setRecommandedType({type:data.type,reason:data.reason})

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setAiLoading(false);
        }
    };

    return (<>
        <div
        className="
            group relative overflow-hidden
            rounded-2xl
            border border-purple-100
            bg-white
            p-5
            shadow-sm
            transition-all duration-300
            hover:-translate-y-1
            hover:border-purple-300
            hover:shadow-[0_12px_35px_rgba(88,28,135,0.15)]
        "
        >
        {/* decorative glow */}
        <div
            className="
            pointer-events-none absolute -right-10 -top-10
            h-28 w-28 rounded-full
            bg-purple-200/30 blur-3xl
            transition-all duration-300
            group-hover:bg-purple-300/40
            "
        />

        {/* top */}
        <div className="relative flex items-center justify-between gap-3">
            <h4 className="text-lg font-bold text-gray-800">
            {title}
            </h4>

            {recommandedType.type && (
            <button
                onClick={() => setShowTypeReason(true)}
                className="
                shrink-0
                rounded-full
                border border-purple-200
                bg-purple-50
                px-3 py-1
                text-xs font-semibold
                text-purple-700
                transition
                hover:bg-purple-100
                hover:border-purple-300
                "
            >
                {recommandedType.type}
            </button>
            )}
        </div>

        {/* description */}
        <div className="relative mt-4">
            {showAll ? (
            <div
                onClick={() => setShowAll(false)}
                className="
                rounded-xl
                border border-purple-100
                bg-purple-50/40
                p-3
                cursor-pointer
                "
            >
                <p className="text-sm leading-6 text-gray-700">
                {description}
                </p>

                <button className="mt-2 text-xs font-medium text-purple-500 hover:text-purple-700">
                close
                </button>
            </div>
            ) : (
            <div
                onClick={() => setShowAll(true)}
                className="cursor-pointer"
            >
                <p className="text-sm leading-6 text-gray-600">
                {description.slice(0, 150)}...
                </p>

                <button className="mt-1 text-xs font-semibold text-purple-500 hover:text-purple-700">
                show more
                </button>
            </div>
            )}
        </div>

        {/* actions */}
        <div className="relative mt-5 flex flex-wrap gap-2">

            {/* Delete */}
            <button
            onClick={onDelete}
            className="
                rounded-lg
                border border-red-100
                bg-red-50
                px-3 py-2
                text-xs font-semibold
                text-red-600
                transition
                hover:bg-red-100
            "
            >
            Delete
            </button>

            {/* Clarify */}
            <button
            onClick={() => router.push(`/inbox/clarify/${id}`)}
            className="
                rounded-lg
                bg-purple-600
                px-4 py-2
                text-xs font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-purple-700
                hover:shadow-md
            "
            >
            Clarify
            </button>

            {/* AI */}
            <Button
            onClick={() => recommandItemTypeByAi()}
            size="xs"
            className="
                relative overflow-hidden
                rounded-lg
                border border-fuchsia-200
                bg-gradient-to-r from-purple-600 to-fuchsia-500
                px-4 py-1
                text-xs font-semibold
                text-white
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-[0_6px_20px_rgba(168,85,247,0.35)]
            "
            disabled={aiLoading}
            >
            
            {aiLoading? 'processing ...':'✦ AI '}
            </Button>
        </div>


        <AiRecommandationModal
        show={showTypeReason}
        onClose={() => setShowTypeReason(false)}
        title={title}
        aiType={recommandedType.type}
        aiReason={recommandedType.reason}
        />

     
       
        </div>
    </>)
}

export default InboxItemCard;