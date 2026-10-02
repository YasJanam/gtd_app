'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Clock,
    TrashBin,
    Check,
    ArrowRight
} from "flowbite-react-icons/outline";

import { getCookie } from "cookies-next";

type Probs = {
    id: string,
    title: string,
    description: string,
    onDelete: () => void,
    refetch?:() => void,

}

const SomedayItemCard = ({
    id,
    title,
    description,
    onDelete,
    refetch,
}: Probs) => {

    const router = useRouter();
    const token = getCookie('access_token');
    

    const [showAll, setShowAll] = useState(false);

    const [recommandedType, setRecommandedType] = useState({
        type: '',
        reason: ''
    });

    const [aiLoading, setAiLoading] = useState(false);


    const recommandItemTypeByAi = async () => {
        try {

            setAiLoading(true);

            const response = await fetch('/api/ai/recommand-item-type', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(
                    error.error || 'Error generating recommendation'
                );
            }

            const data = await response.json();

            setRecommandedType({
                type: data.type,
                reason: data.reason
            });

        } catch (error) {

            console.error('Error:', error);

        } finally {

            setAiLoading(false);

        }
    };


    const onDone = async () => {
        try {
            
            const token = getCookie('access_token');

            const response = await fetch(`${API_BASE_URL}/inbox/items/${id}/done`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) refetch?.();
        } catch (error) {
            console.error(error);
        } 
    };


    return (
        <div
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-indigo-100/80
                bg-white
                px-3
                py-3
                shadow-[0_2px_10px_rgba(79,70,229,0.035)]
                transition-all
                duration-200
                hover:border-indigo-200
                hover:shadow-[0_6px_20px_rgba(79,70,229,0.07)]
            "
        >

            {/* Soft background */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-12
                    -top-12
                    h-28
                    w-28
                    rounded-full
                    bg-indigo-100/30
                    blur-3xl
                    transition
                    duration-300
                    group-hover:bg-indigo-100/50
                "
            />


            {/* Left accent */}
            <div
                className="
                    absolute
                    left-0
                    top-3
                    bottom-3
                    w-[2px]
                    rounded-full
                    bg-indigo-300
                    transition
                    group-hover:bg-indigo-500
                "
            />


            <div className="relative flex items-center gap-3">


                {/* Icon */}
                <div
                    className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-indigo-100
                        bg-indigo-50
                        text-indigo-500
                        transition
                        group-hover:border-indigo-200
                        group-hover:bg-indigo-100
                    "
                >
                    <Clock size={18} />
                </div>


                {/* Content */}
                <div className="min-w-0 flex-1">

                    {/* Title */}
                    <div className="flex min-w-0 items-center gap-2">

                        <h4
                            className="
                                min-w-0
                                truncate
                                text-sm
                                font-semibold
                                text-gray-800
                            "
                        >
                            {title}
                        </h4>


                        {recommandedType.type && (
                            <span
                                className="
                                    shrink-0
                                    rounded-full
                                    border
                                    border-indigo-100
                                    bg-indigo-50
                                    px-2
                                    py-0.5
                                    text-[10px]
                                    font-medium
                                    text-indigo-600
                                "
                            >
                                {recommandedType.type}
                            </span>
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
                                    bg-indigo-50/50
                                    px-2
                                    py-1
                                "
                            >
                                <p className="text-xs leading-5 text-gray-600">
                                    {description || "No description."}
                                </p>

                                <button
                                    className="
                                        mt-0.5
                                        text-[10px]
                                        font-medium
                                        text-indigo-500
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
                                        truncate
                                        text-xs
                                        text-gray-400
                                        transition
                                        group-hover:text-gray-500
                                    "
                                >
                                    {description
                                        ? `${description.slice(0, 110)}${description.length > 110 ? "..." : ""}`
                                        : "No description."
                                    }
                                </p>

                                {description && description.length > 110 && (
                                    <button
                                        className="
                                            text-[10px]
                                            font-medium
                                            text-indigo-400
                                            hover:text-indigo-600
                                        "
                                    >
                                        show more
                                    </button>
                                )}

                            </div>

                        )}

                    </div>

                </div>


                {/* Actions */}
                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-1
                    "
                >

                    {/* Move */}
                    <button
                        onClick={() => {}}
                        title="Move to Next Action"
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-indigo-100
                            bg-indigo-50
                            text-indigo-500
                            transition-all
                            hover:border-indigo-200
                            hover:bg-indigo-100
                            hover:text-indigo-700
                        "
                    >
                        <ArrowRight size={15} />
                    </button>


                    {/* Done */}
                    <button
                        onClick={onDone}
                        title="Done"
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-emerald-100
                            bg-emerald-50
                            text-emerald-500
                            transition-all
                            hover:border-emerald-200
                            hover:bg-emerald-100
                            hover:text-emerald-700
                        "
                    >
                        <Check size={15} />
                    </button>


                    {/* Delete */}
                    <button
                        onClick={onDelete}
                        title="Delete"
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-red-100
                            bg-red-50
                            text-red-400
                            transition-all
                            hover:border-red-200
                            hover:bg-red-100
                            hover:text-red-600
                        "
                    >
                        <TrashBin size={15} />
                    </button>


                    {/* AI */}
                    <button
                        onClick={recommandItemTypeByAi}
                        disabled={aiLoading}
                        title="AI recommendation"
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-purple-100
                            bg-purple-50
                            text-purple-500
                            transition-all
                            hover:border-purple-200
                            hover:bg-purple-100
                            hover:text-purple-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {aiLoading ? (
                            <span className="text-[10px]">
                                ...
                            </span>
                        ) : (
                            <span className="text-sm font-bold">
                                AI
                            </span>
                        )}
                    </button>

                </div>

            </div>


            {/* Bottom hint */}
            <div
                className="
                    relative
                    mt-2
                    ml-12
                    flex
                    items-center
                    gap-1.5
                    text-[10px]
                    text-indigo-300
                "
            >
                <Clock size={10} />

                <span>
                    Maybe later
                </span>
            </div>

        </div>
    );
}

export default SomedayItemCard;