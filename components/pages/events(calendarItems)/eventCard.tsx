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
    dueDate?: Date | string;
    onDelete: () => void;
    refetch?: () => void;
};

type Recommendation = {
    type: string;
    reason: string;
};

type Tone = "overdue" | "today" | "soon" | "later";

const DAY_MS = 86_400_000;

const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();


const TONES: Record<Tone, { tile: string; chip: string }> = {
    overdue: {
        tile: "bg-rose-50 text-rose-600 ring-rose-200",
        chip: "bg-rose-50 text-rose-700 ring-rose-200",
    },
    today: {
        tile: "bg-emerald-50 text-emerald-600 ring-emerald-200",
        chip: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    },
    soon: {
        tile: "bg-purple-50 text-purple-600 ring-purple-200",
        chip: "bg-purple-50 text-purple-700 ring-purple-200",
    },
    later: {
        tile: "bg-slate-50 text-slate-500 ring-slate-200",
        chip: "bg-slate-50 text-slate-600 ring-slate-200",
    },
};


const getRelative = (date: Date): { label: string; tone: Tone } => {
    const diff = Math.round((startOfDay(date) - startOfDay(new Date())) / DAY_MS);

    if (diff < 0) {
        const n = Math.abs(diff);
        return { label: n === 1 ? "Yesterday" : `${n} days overdue`, tone: "overdue" };
    }
    if (diff === 0) return { label: "Today", tone: "today" };
    if (diff === 1) return { label: "Tomorrow", tone: "soon" };
    if (diff <= 7) {
        return {
            label: date.toLocaleDateString("en-US", { weekday: "long" }),
            tone: "soon",
        };
    }
    return { label: `In ${diff} days`, tone: "later" };
};


const CalendarItemCard = ({
    id,
    title,
    description,
    dueDate,
    refetch,
    onDelete,
}: Props) => {
    const [showAll, setShowAll] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

    const isLong = (description?.length ?? 0) > 120;

    /* Date */
    const parsed = dueDate ? new Date(dueDate) : null;
    const date = parsed && !isNaN(parsed.getTime()) ? parsed : null;

    const relative = date ? getRelative(date) : null;
    const tone = relative ? TONES[relative.tone] : null;

    /* Items created with a date only are stored at 12:00, so don't show a fake time */
    const hasRealTime =
        !!date && !(date.getHours() === 12 && date.getMinutes() === 0);

    const timeText = date
        ? date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
        : "";

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
        } finally {
            setDoneLoading(false);
        }
    };

    return (
        <div
            className="
                group relative flex items-start gap-3.5
                overflow-hidden rounded-2xl
                border border-white/60 bg-white
                p-3.5
                shadow-[0_2px_10px_rgba(88,28,135,0.08)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_10px_30px_rgba(88,28,135,0.18)]
            "
        >
            {/* Soft glow */}
            <div
                className="
                    pointer-events-none absolute -right-10 -top-10 h-28 w-28
                    rounded-full bg-purple-200/40 blur-2xl
                    opacity-0 transition-opacity duration-300
                    group-hover:opacity-100
                "
            />

            {/* Date tile */}
            {date && tone ? (
                <div
                    className={`
                        relative flex h-12 w-12 shrink-0 flex-col items-center justify-center
                        rounded-xl ring-1 ring-inset ${tone.tile}
                    `}
                >
                    <span className="text-[10px] font-semibold uppercase leading-none tracking-wide">
                        {date.toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="mt-0.5 text-lg font-bold leading-none">
                        {date.getDate()}
                    </span>
                </div>
            ) : (
                <div
                    className="
                        relative flex h-12 w-12 shrink-0 items-center justify-center
                        rounded-xl bg-gray-50 text-gray-300 ring-1 ring-inset ring-gray-200
                    "
                >
                    <Clock size={18} />
                </div>
            )}

            {/* Content */}
            <div className="relative min-w-0 flex-1">
                <h4 className="truncate text-[15px] font-semibold leading-6 text-gray-900">
                    {title}
                </h4>

                {/* Relative date + time */}
                {relative && tone && (
                    <div className="mt-0.5 flex flex-wrap items-center gap-2">
                        <span
                            className={`
                                rounded-full px-2 py-0.5 text-[11px] font-medium
                                ring-1 ring-inset ${tone.chip}
                            `}
                        >
                            {relative.label}
                        </span>

                        {hasRealTime && (
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock size={12} className="text-gray-400" />
                                {timeText}
                            </span>
                        )}
                    </div>
                )}

                {/* Description */}
                {description && (
                    <button
                        type="button"
                        onClick={() => setShowAll((v) => !v)}
                        className="mt-2 block w-full text-left"
                    >
                        {showAll ? (
                            <div className="rounded-xl bg-purple-50/70 px-3 py-2">
                                <p className="whitespace-pre-wrap break-words text-[13px] leading-6 text-gray-600">
                                    {description}
                                </p>
                                <span className="mt-1 inline-block text-[11px] font-medium text-purple-500">
                                    Show less
                                </span>
                            </div>
                        ) : (
                            <div className="flex min-w-0 items-center gap-1.5">
                                <p className="min-w-0 truncate text-[13px] leading-6 text-gray-500">
                                    {description}
                                </p>
                                {isLong && (
                                    <span className="shrink-0 text-[11px] font-medium text-purple-500">
                                        Show more
                                    </span>
                                )}
                            </div>
                        )}
                    </button>
                )}

                {/* AI recommendation */}
                {recommendation && (
                    <div
                        className="
                            mt-3 rounded-xl border border-purple-100
                            bg-gradient-to-br from-purple-50 to-white
                            px-3 py-2.5
                        "
                    >
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-purple-500">✦</span>
                                <span className="text-xs text-gray-500">Suggested type</span>
                                <span className="rounded-full bg-purple-600 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                                    {recommendation.type}
                                </span>
                            </div>

                            <button
                                onClick={() => setRecommendation(null)}
                                aria-label="Dismiss suggestion"
                                className="
                                    flex h-5 w-5 items-center justify-center rounded-full
                                    text-xs text-purple-400 transition
                                    hover:bg-purple-100 hover:text-purple-600
                                "
                            >
                                ✕
                            </button>
                        </div>

                        {recommendation.reason && (
                            <p className="mt-1.5 text-xs leading-5 text-gray-600">
                                {recommendation.reason}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="relative flex shrink-0 flex-col items-end gap-1.5">
                <button
                    onClick={onDone}
                    disabled={doneLoading}
                    title="Mark as done"
                    aria-label="Mark as done"
                    className="
                        flex h-8 items-center gap-1.5 rounded-full
                        border border-gray-200 bg-white px-3
                        text-xs font-semibold text-gray-500 transition
                        hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600
                        disabled:opacity-50
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300
                    "
                >
                    <Check size={13} />
                    {doneLoading ? "Saving..." : "Done"}
                </button>

                <div className="flex items-center gap-1">
                    <button
                        onClick={recommendItemTypeByAi}
                        disabled={aiLoading}
                        title="Suggest a type with AI"
                        aria-label="Suggest a type with AI"
                        className="
                            flex h-8 w-8 items-center justify-center rounded-full
                            bg-purple-50 text-purple-500 transition
                            hover:bg-purple-100 hover:text-purple-700
                            disabled:opacity-60
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300
                        "
                    >
                        {aiLoading ? (
                            <span className="animate-pulse text-[10px]">...</span>
                        ) : (
                            "✦"
                        )}
                    </button>

                    <button
                        onClick={onDelete}
                        title="Delete"
                        aria-label="Delete"
                        className="
                            flex h-8 w-8 items-center justify-center rounded-full
                            text-gray-300 transition
                            hover:bg-red-50 hover:text-red-500
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300
                        "
                    >
                        <TrashBin size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarItemCard;