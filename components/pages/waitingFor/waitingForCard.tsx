'use client'

import { useState } from "react";
import { Check, Clock, TrashBin } from "flowbite-react-icons/outline";
import { getCookie } from "cookies-next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
    id: string;
    title: string;
    description?: string;
    status?: string;
    delegatedTo?: string;
    onDelete: () => void;
    refetch?: () => void;
};

type Recommendation = {
    type: string;
    reason: string;
};

const WaitingForCard = ({
    id,
    title,
    description,
    delegatedTo,
    onDelete,
    refetch,
}: Props) => {
    const [showAll, setShowAll] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

    const isLong = (description?.length ?? 0) > 120;

    const recommendItemTypeByAi = async () => {
        try {
            setAiLoading(true);

            const response = await fetch('/api/ai/recommand-item-type', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Error');
            }

            const data = await response.json();
            setRecommendation({ type: data.type, reason: data.reason });
        } catch (error) {
            console.error(error);
        } finally {
            setAiLoading(false);
        }
    };

    const onDone = async () => {
        try {
            setDoneLoading(true);
            const token = getCookie('access_token');

            const response = await fetch(`${API_BASE_URL}/inbox/items/${id}/change-status`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'done' }),
            });

            if (response.ok) refetch?.();
        } catch (error) {
            console.error(error);
        } finally {
            setDoneLoading(false);
        }
    };

    return (
        <div
            className="
                group relative flex items-start gap-3
                rounded-xl border border-gray-100 bg-white
                py-3 pl-4 pr-3
                shadow-[0_1px_4px_rgba(88,28,135,0.04)]
                transition-all duration-200
                hover:border-purple-200
                hover:shadow-[0_4px_16px_rgba(88,28,135,0.08)]
            "
        >
            {/* Accent */}
            <div
                className="
                    absolute left-0 top-3 bottom-3 w-[3px] rounded-full
                    bg-purple-300 transition-colors
                    group-hover:bg-purple-500
                "
            />

            {/* Done */}
            <button
                onClick={onDone}
                disabled={doneLoading}
                title="Done"
                aria-label="Mark as done"
                className="
                    mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center
                    rounded-full border border-gray-300 bg-gray-50 text-gray-400
                    transition
                    hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-500
                    disabled:opacity-50
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300
                "
            >
                <Check size={13} />
            </button>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-semibold text-gray-800">
                    {title}
                </h4>

                {/* Delegated to */}
                {delegatedTo && (
                    <div className="mt-1 flex items-center gap-1.5">
                        <span
                            className="
                                flex h-4 w-4 items-center justify-center
                                rounded-full bg-purple-100
                                text-[9px] font-semibold uppercase text-purple-600
                            "
                        >
                            {delegatedTo.trim().charAt(0)}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock size={12} className="text-purple-400" />
                            Waiting for
                            <span className="font-medium text-gray-700">{delegatedTo}</span>
                        </span>
                    </div>
                )}

                {/* Description */}
                {description && (
                    <div
                        onClick={() => setShowAll((v) => !v)}
                        className="mt-1.5 cursor-pointer"
                    >
                        {showAll ? (
                            <div className="rounded-md bg-purple-50/60 px-2.5 py-1.5">
                                <p className="whitespace-pre-wrap text-xs leading-5 text-gray-600">
                                    {description}
                                </p>
                                <span className="text-[10px] font-medium text-purple-500">
                                    close
                                </span>
                            </div>
                        ) : (
                            <div className="flex min-w-0 items-center gap-1">
                                <p
                                    className="
                                        min-w-0 truncate text-xs leading-5 text-gray-400
                                        transition-colors group-hover:text-gray-500
                                    "
                                >
                                    {description}
                                </p>
                                {isLong && (
                                    <span className="shrink-0 text-[10px] font-medium text-purple-400">
                                        more
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* AI recommendation */}
                {recommendation && (
                    <div className="mt-2 rounded-md border border-purple-100 bg-purple-50/60 px-2.5 py-1.5">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-purple-700">
                                ✦ Suggested: {recommendation.type}
                            </span>
                            <button
                                onClick={() => setRecommendation(null)}
                                aria-label="Dismiss suggestion"
                                className="text-xs text-purple-400 hover:text-purple-600"
                            >
                                ✕
                            </button>
                        </div>
                        {recommendation.reason && (
                            <p className="mt-0.5 text-xs leading-5 text-gray-600">
                                {recommendation.reason}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-1">
                <button
                    onClick={recommendItemTypeByAi}
                    disabled={aiLoading}
                    title="Suggest a type with AI"
                    aria-label="Suggest a type with AI"
                    className="
                        flex h-7 w-7 items-center justify-center rounded-md
                        bg-purple-50 text-purple-500 transition
                        hover:bg-purple-100 hover:text-purple-600
                        disabled:opacity-60
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300
                    "
                >
                    {aiLoading ? <span className="animate-pulse text-[10px]">...</span> : "✦"}
                </button>

                <button
                    onClick={onDelete}
                    title="Delete"
                    aria-label="Delete"
                    className="
                        flex h-7 w-7 items-center justify-center rounded-md
                        text-gray-400 transition
                        hover:bg-red-50 hover:text-red-500
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300
                    "
                >
                    <TrashBin size={16} />
                </button>
            </div>
        </div>
    );
};

export default WaitingForCard;