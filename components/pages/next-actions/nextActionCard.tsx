'use client'

import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useRouter } from "next/navigation"
import { useState } from "react";
import AiResponse from "@/components/commonComponents/aiResponse";
//import AiRecommandationModal from "./modals/aiRecommdandationModal";

type Probs = {
    id:string,
    title: string,
    description:string,
    status:string
    onDelete:() => void,

}

const NextActionCard = ({id,title,description,onDelete,status}:Probs) => {
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
        group
        relative
        flex
        flex-col
        lg:flex-row
        lg:items-center
        gap-3
        rounded-xl
        border
        border-purple-100/80
        bg-white
        px-4
        py-3
        shadow-[0_2px_10px_rgba(88,28,135,0.04)]
        transition-all
        duration-200
        hover:-translate-y-[1px]
        hover:border-purple-200
        hover:shadow-[0_6px_18px_rgba(88,28,135,0.08)]
    "
    >

    {/* subtle accent */}
    <div
        className="
        absolute
        left-0
        top-3
        bottom-3
        w-[3px]
        rounded-full
        bg-purple-400/70
        transition-all
        duration-200
        group-hover:bg-purple-500
        "
    />


    {/* Main content */}
    <div className="min-w-0 flex-1 pl-2">

        <div className="flex items-center gap-2.5 min-w-0">

        {/* Check icon */}
        <div
            className="
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-purple-50
            text-purple-500
            transition
            group-hover:bg-purple-100
            "
        >
            ✓
        </div>


        {/* Text */}
        <div className="min-w-0 flex-1">

            <div className="flex items-center gap-2">

            <h4
                className="
                truncate
                text-sm
                font-semibold
                text-gray-800
                "
            >
                {title}
            </h4>

            {recommandedType.type && (
                <button
                onClick={() => setShowTypeReason(true)}
                className="
                    shrink-0
                    rounded-full
                    border
                    border-purple-100
                    bg-purple-50
                    px-2
                    py-0.5
                    text-[10px]
                    font-medium
                    text-purple-600
                    transition
                    hover:border-purple-200
                    hover:bg-purple-100
                "
                >
                {recommandedType.type}
                </button>
            )}

            </div>


            {/* Description */}
            <div className="mt-0.5">

            {showAll ? (

                <div
                onClick={() => setShowAll(false)}
                className="
                    cursor-pointer
                    rounded-lg
                    bg-purple-50/50
                    px-2.5
                    py-1.5
                "
                >
                <p className="text-xs leading-5 text-gray-600">
                    {description}
                </p>

                <button
                    className="
                    mt-0.5
                    text-[10px]
                    font-medium
                    text-purple-500
                    hover:text-purple-700
                    "
                >
                    close
                </button>
                </div>

            ) : (

                <div
                onClick={() => setShowAll(true)}
                className="cursor-pointer"
                >
                <p
                    className="
                    line-clamp-1
                    text-xs
                    leading-5
                    text-gray-400
                    transition
                    group-hover:text-gray-500
                    "
                >
                    {description
                    ? `${description.slice(0, 150)}${description.length > 150 ? "..." : ""}`
                    : "No description."
                    }
                </p>

                {description && description.length > 150 && (
                    <button
                    className="
                        text-[10px]
                        font-medium
                        text-purple-400
                        hover:text-purple-600
                    "
                    >
                    show more
                    </button>
                )}

                </div>

            )}

            </div>

        </div>

        </div>

    </div>


    {/* Actions */}
    <div
        className="
        flex
        shrink-0
        items-center
        gap-1.5
        border-t
        border-gray-100
        pt-2
        lg:border-t-0
        lg:pt-0
        "
    >

        <button
        onClick={() => {}}
        className="
        flex
        items-center
        gap-1
        rounded-lg
        border
        border-emerald-100
        bg-emerald-50/80
        px-2.5
        py-1.5
        text-[11px]
        font-medium
        text-emerald-600
        transition
        hover:bg-emerald-100
        hover:text-emerald-700
        "
    >
        ✓
        Done
    </button>

        {/* Delete */}
        <button
        onClick={onDelete}
        className="
            rounded-lg
            border
            border-red-100
            bg-red-50/70
            px-2.5
            py-1.5
            text-[11px]
            font-medium
            text-red-500
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
            px-3
            py-1.5
            text-[11px]
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-purple-700
        "
        >
        Clarify
        </button>


        {/* AI */}
        <Button
        onClick={() => recommandItemTypeByAi()}
        size="xs"
        disabled={aiLoading}
        className="
            rounded-lg
            border
            border-purple-100
            bg-purple-50
            px-3
            py-1.5
            text-[11px]
            font-medium
            text-purple-600
            shadow-none
            transition
            hover:bg-purple-100
            hover:text-purple-700
        "
        >
        {aiLoading ? "processing..." : "✦ AI"}
        </Button>

    </div>

    </div>


          {/*<AiRecommandationModal
        show={showTypeReason}
        onClose={() => setShowTypeReason(false)}
        title={title}
        aiType={recommandedType.type}
        aiReason={recommandedType.reason}
        />*/}


    </>)
}

export default NextActionCard;