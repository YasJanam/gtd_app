'use client'

import { Button } from "flowbite-react";
import { useState } from "react";
import {
    CalendarWeek,
    Clock,
    Check,
    TrashBin,
} from "flowbite-react-icons/outline";

type Probs = {
    id: string,
    title: string,
    description: string,
    status: string,
    onDelete: () => void,
    dueDate: Date | string,
}

const CalendarItemCard = ({
    id,
    title,
    description,
    onDelete,
    dueDate
}: Probs) => {

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
                throw new Error(error.error || 'Error');
            }

            const data = await response.json();

            setRecommandedType({
                type: data.type,
                reason: data.reason
            });

        } catch (error) {

            console.error(error);

        } finally {

            setAiLoading(false);

        }

    };


    /* Date */

    const parsedDate = dueDate ? new Date(dueDate) : null;

    const formattedDate = parsedDate
        ? parsedDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        })
        : '';

    const formattedTime = parsedDate
        ? parsedDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
        })
        : '';


    return (

 <div
    className="
        group
        relative
        flex
        items-center
        gap-2.5
        rounded-lg
        border border-gray-100
        bg-white
        px-3
        py-2
        shadow-[0_1px_4px_rgba(88,28,135,0.03)]
        transition-all
        duration-200
        hover:border-purple-200
        hover:shadow-[0_3px_12px_rgba(88,28,135,0.06)]
    "
>
    {/* Accent */}
    <div
        className="
            absolute
            left-0
            top-2
            bottom-2
            w-[2px]
            rounded-full
            bg-purple-300
            transition
            group-hover:bg-purple-500
        "
    />


    {/* Done */}
    <button
        onClick={() => {}}
        title="Done"
        className="
            ml-1
            flex
            h-6
            w-6
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-gray-400
            bg-gray-50
            text-gray-500
            transition
            hover:border-emerald-200
            hover:bg-emerald-50
            hover:text-emerald-500
        "
    >
        <Check size={13} />
    </button>


    {/* Content */}
    <div className="min-w-0 flex-1">

        {/* Title + Date */}
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


            {/* Date / Time */}
            {parsedDate && (
                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-1
                        rounded-md
                        bg-purple-50
                        px-1.5
                        py-0.5
                        text-purple-600
                    "
                >
                    <CalendarWeek size={12} />

                    <span className="text-xs font-medium whitespace-nowrap">
                        {formattedDate}
                    </span>

                    <span className="text-purple-300">
                        ·
                    </span>

                    <Clock size={11} />

                    <span className="text-xs font-medium whitespace-nowrap">
                        {formattedTime}
                    </span>
                </div>
            )}

        </div>


        {/* Description */}
        {description && (
            <div
                onClick={() => setShowAll(!showAll)}
                className="mt-0.5 cursor-pointer"
            >

                {showAll ? (

                    <div
                        className="
                            rounded-md
                            bg-purple-50/50
                            px-2
                            py-1
                        "
                    >
                        <p className="text-xs leading-5 text-gray-600">
                            {description}
                        </p>

                        <span
                            className="
                                text-[10px]
                                font-medium
                                text-purple-500
                            "
                        >
                            close
                        </span>
                    </div>

                ) : (

                    <div className="flex items-center gap-1 min-w-0">

                        <p
                            className="
                                min-w-0
                                truncate
                                text-xs
                                leading-5
                                text-gray-400
                                transition
                                group-hover:text-gray-500
                            "
                        >
                            {description}
                        </p>

                        {description.length > 120 && (
                            <span
                                className="
                                    shrink-0
                                    text-[10px]
                                    font-medium
                                    text-purple-400
                                "
                            >
                                more
                            </span>
                        )}

                    </div>

                )}

            </div>
        )}

    </div>


    {/* Actions */}
    <div
        className="
            flex
            shrink-0
            items-center
            gap-0.5
        "
    >

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
                rounded-md
                text-red-500
                transition
                hover:bg-red-50
                hover:text-red-500
            "
        >
            <TrashBin size={17} />
        </button>


        {/* AI */}
        <button
            onClick={recommandItemTypeByAi}
            disabled={aiLoading}
            title="AI"
            className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-md
                bg-purple-50
                text-purple-500
                transition
                hover:bg-purple-100
                hover:text-purple-600
            "
        >
            {aiLoading ? (
                <span className="text-[10px]">...</span>
            ) : (
                "✦"
            )}
        </button>

    </div>

</div>
    );
}

export default CalendarItemCard;