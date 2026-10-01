'use client'

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
    BookOpen,
    TrashBin,
    Check,
   // Pen,
    Edit,
    PaperClip,
    
} from "flowbite-react-icons/outline";

type Probs = {
    id: string,
    title: string,
    description: string,
    onDelete: () => void,
}

const CopyIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v1.5A2.25 2.25 0 0 1 13.5 21h-7.5a2.25 2.25 0 0 1-2.25-2.25v-9.5A2.25 2.25 0 0 1 6 7h1.5m3.75-3.75h7.5A2.25 2.25 0 0 1 21 5.5v9.25a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 9 14.75V5.5a2.25 2.25 0 0 1 2.25-2.25Z"
        />
    </svg>
);


const ReferenceCard = ({
    id,
    title,
    description,
    onDelete,
}: Probs) => {

    const router = useRouter();

    const [showAll, setShowAll] = useState(false);

    const [recommandedType, setRecommandedType] = useState({
        type: '',
        reason: ''
    });
    const [copied, setCopied] = useState(false);

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
                throw new Error(error.error || 'Error');
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


    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(description || title);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="
                group
                relative
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-slate-100
                bg-white
                px-3.5
                py-3
                shadow-[0_1px_6px_rgba(15,23,42,0.035)]
                transition-all
                duration-200
                hover:border-slate-200
                hover:shadow-[0_5px_16px_rgba(15,23,42,0.07)]
            "
        >

            {/* Reference accent */}
            <div
                className="
                    absolute
                    left-0
                    top-2.5
                    bottom-2.5
                    w-[2px]
                    rounded-full
                    bg-slate-300
                    transition
                    group-hover:bg-slate-400
                "
            />


            {/* Icon */}
            <div
                className="
                    ml-1
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-100
                    bg-slate-50
                    text-slate-500
                    transition
                    group-hover:bg-slate-100
                    group-hover:text-slate-600
                "
            >
                <BookOpen size={16} />
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
                            text-slate-800
                        "
                    >
                        {title}
                    </h4>


                    {/* AI type */}
                    {recommandedType.type && (
                        <span
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
                            "
                        >
                            {recommandedType.type}
                        </span>
                    )}

                </div>


                {/* Description */}
                <div className="mt-1">

                    {showAll ? (

                        <div
                            onClick={() => setShowAll(false)}
                            className="
                                cursor-pointer
                                rounded-lg
                                bg-slate-50
                                px-2.5
                                py-1.5
                            "
                        >

                            <p className="text-xs leading-5 text-slate-600">
                                {description || "No description."}
                            </p>

                            <span
                                className="
                                    mt-0.5
                                    block
                                    text-[10px]
                                    font-medium
                                    text-slate-400
                                "
                            >
                                close
                            </span>

                        </div>

                    ) : (

                        <div
                            onClick={() => description && setShowAll(true)}
                            className={description ? "cursor-pointer" : ""}
                        >

                            <p
                                className="
                                    truncate
                                    text-xs
                                    leading-5
                                    text-slate-400
                                    transition
                                    group-hover:text-slate-500
                                "
                            >
                                {description || "No description."}
                            </p>

                            {description && description.length > 120 && (
                                <span
                                    className="
                                        text-[10px]
                                        font-medium
                                        text-slate-400
                                        transition
                                        hover:text-slate-600
                                    "
                                >
                                    show more
                                </span>
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

                {/* Done */}
                {/*<button
                    onClick={() => {}}
                    title="Done"
                    className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-emerald-100
                        bg-emerald-50
                        text-emerald-600
                        transition
                        hover:border-emerald-200
                        hover:bg-emerald-100
                    "
                >
                    <Check size={14} />
                </button>*/}


                {/* Clarify / Edit */}
                {/*<button
                    onClick={() => router.push(`/inbox/clarify/${id}`)}
                    title="Edit"
                    className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-100
                        bg-slate-50
                        text-slate-500
                        transition
                        hover:border-slate-200
                        hover:bg-slate-100
                        hover:text-slate-700
                    "
                >
                    <Edit size={13} />
                </button>*/}


                {/* AI */}
                {/*<Button
                    onClick={recommandItemTypeByAi}
                    size="xs"
                    disabled={aiLoading}
                    title="AI"
                    className="
                        !h-7
                        !w-7
                        !p-0
                        flex
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-purple-100
                        bg-purple-50
                        text-purple-600
                        shadow-none
                        transition
                        hover:border-purple-200
                        hover:bg-purple-100
                    "
                >
                    {aiLoading
                        ? "..."
                        : <PaperClip size={14} />
                    }
                </Button>*/}


                
                <button
                    onClick={copyContent}
                    title={copied ? "Copied" : "Copy"}
                    aria-label={copied ? "Copied" : "Copy"}
                    className={`
                        flex h-7 w-7 items-center justify-center rounded-md transition
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300
                        ${copied
                            ? "text-emerald-600"
                            : "text-slate-400 hover:bg-sky-50 hover:text-sky-600"}
                    `}
                >
                    {copied ? <Check size={14} /> : <CopyIcon />}
                </button>
                


                {/* Delete */}
                <button
                    onClick={onDelete}
                    title="Delete"
                    className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-red-100
                        bg-red-50
                        text-red-500
                        transition
                        hover:border-red-200
                        hover:bg-red-100
                    "
                >
                    <TrashBin size={13} />
                </button>

            </div>

        </div>
    );
}

export default ReferenceCard;