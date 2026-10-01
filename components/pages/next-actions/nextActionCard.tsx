'use client'

import { useState } from "react";
import { Check, TrashBin } from "flowbite-react-icons/outline";
import { getCookie } from "cookies-next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
    id: string;
    title: string;
    description?: string;
    onDelete: () => void;
    refetch?: () => void;
};

type Recommendation = {
    type: string;
    reason: string;
};

const BoltIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
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
            d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z"
        />
    </svg>
);

const NextActionCard = ({ id, title, description, onDelete, refetch }: Props) => {
    const [showAll, setShowAll] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

    const isLong = (description?.length ?? 0) > 140;

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
                group relative overflow-hidden rounded-xl
                border border-purple-100/80 bg-white
                py-2.5 pl-4 pr-3
                shadow-[0_1px_4px_rgba(88,28,135,0.06)]
                transition-all duration-200
                hover:-translate-y-px hover:border-purple-200
                hover:shadow-[0_6px_18px_rgba(88,28,135,0.12)]
            "
        >
            {/* Accent bar */}
            <div
                className="
                    absolute left-0 top-0 h-full w-[3px] bg-purple-400
                    opacity-70 transition-opacity group-hover:opacity-100
                "
            />

            {/* Row 1: icon + title + actions */}
            <div className="flex items-center gap-3">

                {/* Icon tile */}
                <div
                    className="
                        flex h-9 w-9 shrink-0 items-center justify-center
                        rounded-xl bg-gradient-to-br from-purple-50 to-amber-50
                        text-purple-600 ring-1 ring-inset ring-purple-200/70
                    "
                >
                    <BoltIcon />
                </div>

                {/* Title */}
                <h4 className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">
                    {title}
                </h4>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1.5">
                    {/* Secondary: always visible on mobile, fade in on hover on desktop */}
                    <div
                        className="
                            flex items-center gap-1 transition-opacity duration-200
                            md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100
                        "
                    >
                        <button
                            onClick={recommendItemTypeByAi}
                            disabled={aiLoading}
                            title="Suggest a type with AI"
                            aria-label="Suggest a type with AI"
                            className="
                                flex h-9 w-9 items-center justify-center rounded-full
                                bg-purple-50 text-base text-purple-500 transition
                                hover:bg-purple-100 hover:text-purple-700
                                disabled:opacity-60
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300
                            "
                        >
                            {aiLoading ? (
                                <span className="animate-pulse text-xs">...</span>
                            ) : (
                                "✦"
                            )}
                        </button>

                        <button
                            onClick={onDelete}
                            title="Delete"
                            aria-label="Delete"
                            className="
                                flex h-9 w-9 items-center justify-center rounded-full
                                bg-slate-50 text-slate-400 transition
                                hover:bg-red-50 hover:text-red-500
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300
                            "
                        >
                            <TrashBin size={18} />
                        </button>
                    </div>

                    {/* Done: always visible */}
                    <button
                        onClick={onDone}
                        disabled={doneLoading}
                        title="Mark as done"
                        aria-label="Mark as done"
                        className="
                            flex h-9 w-9 items-center justify-center rounded-full
                            border border-slate-200 bg-white text-slate-400 transition
                            hover:border-emerald-500 hover:bg-emerald-500 hover:text-white
                            disabled:opacity-50
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300
                        "
                    >
                        <Check size={16} />
                    </button>
                </div>
            </div>

            {/* Row 2: description, full card width */}
            {description && (
                <button
                    type="button"
                    onClick={() => setShowAll((v) => !v)}
                    className="mt-2 block w-full border-t border-dashed border-slate-100 pt-2 text-left"
                >
                    {showAll ? (
                        <div>
                            <p className="whitespace-pre-wrap break-words text-xs leading-5 text-slate-600">
                                {description}
                            </p>
                            <span className="mt-0.5 inline-block text-[11px] font-medium text-purple-500">
                                Show less
                            </span>
                        </div>
                    ) : (
                        <div className="flex min-w-0 items-center gap-1.5">
                            <p className="min-w-0 truncate text-xs leading-5 text-slate-500">
                                {description}
                            </p>
                            {isLong && (
                                <span className="shrink-0 text-[11px] font-medium text-purple-500">
                                    more
                                </span>
                            )}
                        </div>
                    )}
                </button>
            )}

            {/* Row 3: AI suggestion, full card width */}
            {recommendation && (
                <div
                    className="
                        mt-2 flex items-start gap-2 rounded-lg
                        border border-purple-100 bg-gradient-to-r from-purple-50 to-white
                        px-2.5 py-1.5
                    "
                >
                    <span className="mt-px text-xs text-purple-500">✦</span>
                    <p className="flex-1 text-xs leading-5 text-slate-600">
                        <span className="mr-1.5 rounded-full bg-purple-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                            {recommendation.type}
                        </span>
                        {recommendation.reason}
                    </p>
                    <button
                        onClick={() => setRecommendation(null)}
                        aria-label="Dismiss suggestion"
                        className="text-xs text-purple-300 transition hover:text-purple-600"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
};

export default NextActionCard;