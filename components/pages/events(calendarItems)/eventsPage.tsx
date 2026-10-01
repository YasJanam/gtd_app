'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "flowbite-react-icons/outline";
import { Button } from "flowbite-react";
import { toast } from "sonner";
import { getCookie } from "cookies-next";

import DeleteModal from "@/components/commonComponents/deleteModal";
import SearchComponent from "@/components/commonComponents/searchComponent";
import CalendarItemCard from "./eventCard";
import CreateCalendarItemModal from "./modals/createItem";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type EventType = {
    _id: string;
    title: string;
    description: string;
    user: string;
    status: string;
    dueDate: Date | string;
};

type GroupKey = "overdue" | "today" | "tomorrow" | "week" | "later" | "nodate";

const GROUPS: { key: GroupKey; label: string; accent: string }[] = [
    { key: "overdue", label: "Overdue", accent: "text-rose-300" },
    { key: "today", label: "Today", accent: "text-emerald-300" },
    { key: "tomorrow", label: "Tomorrow", accent: "text-purple-200" },
    { key: "week", label: "Next 7 days", accent: "text-purple-200" },
    { key: "later", label: "Later", accent: "text-purple-200/70" },
    { key: "nodate", label: "No date", accent: "text-purple-200/50" },
];

const DAY_MS = 86_400_000;

const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

const parseDate = (value?: Date | string) => {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
};

const getGroupKey = (item: EventType): GroupKey => {
    const due = parseDate(item.dueDate);
    if (!due) return "nodate";

    const diff = Math.round((startOfDay(due) - startOfDay(new Date())) / DAY_MS);

    if (diff < 0) return "overdue";
    if (diff === 0) return "today";
    if (diff === 1) return "tomorrow";
    if (diff <= 7) return "week";
    return "later";
};

/* Inline icon so we don't depend on an icon name that may not exist */
const CalendarIcon = ({ className = "h-7 w-7" }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 3v3m8-3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        />
    </svg>
);

const CalendarItemsComp = () => {
    const [items, setItems] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState("");
    const [showAddItemModal, setShowAddItemModal] = useState(false);

    const getMyCalendarItems = useCallback(async () => {
        try {
            const token = getCookie("access_token");

            const res = await fetch(`${API_BASE_URL}/inbox/user-items?status=calendar`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            toast.error("Couldn't load your calendar items. Try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getMyCalendarItems();
    }, [getMyCalendarItems]);

    const filteredItems = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        if (!q) return items;

        return items.filter(
            (item) =>
                item.title?.toLowerCase().includes(q) ||
                item.description?.toLowerCase().includes(q)
        );
    }, [items, searchTerm]);

    /* Group by when it's due, sorted by date inside each group */
    const grouped = useMemo(() => {
        const map: Record<GroupKey, EventType[]> = {
            overdue: [],
            today: [],
            tomorrow: [],
            week: [],
            later: [],
            nodate: [],
        };

        filteredItems.forEach((item) => map[getGroupKey(item)].push(item));

        (Object.keys(map) as GroupKey[]).forEach((key) => {
            map[key].sort((a, b) => {
                const da = parseDate(a.dueDate)?.getTime() ?? 0;
                const db = parseDate(b.dueDate)?.getTime() ?? 0;
                return da - db;
            });
        });

        return map;
    }, [filteredItems]);

    const isSearching = searchTerm.trim().length > 0;

    return (
        <div className="min-h-screen p-5 md:p-8">

            {/* Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                    <div
                        className="
                            hidden h-14 w-14 shrink-0 items-center justify-center
                            rounded-2xl border border-white/15
                            bg-gradient-to-br from-purple-400/30 to-emerald-500/20
                            text-purple-100 shadow-lg shadow-purple-950/20
                            backdrop-blur-md sm:flex
                        "
                    >
                        <CalendarIcon />
                    </div>

                    <div>
                        <p className="mb-1 text-sm font-medium text-purple-200">
                            GTD • Organize
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                            Calendar
                        </h1>

                        <p className="mt-2 text-sm text-purple-100/70">
                            Things that must happen on a specific day or time.
                        </p>
                    </div>
                </div>

                <Button
                    onClick={() => setShowAddItemModal(true)}
                    size="sm"
                    className="
                        flex items-center gap-2 self-start rounded-xl bg-white
                        px-4 py-2.5 font-semibold text-purple-700
                        shadow-lg shadow-purple-950/20
                        transition-all duration-200
                        hover:-translate-y-0.5 hover:bg-purple-50 hover:shadow-xl
                        sm:self-auto
                    "
                >
                    <Plus size={17} />
                    New Calendar Item
                </Button>
            </div>

            {/* Search */}
            <SearchComponent
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredItems={filteredItems}
            />

            {/* Stats */}
            <div className="mb-7 flex flex-wrap items-center gap-3">
                <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                    <span className="text-xs text-purple-200">
                        {isSearching ? "Matching" : "Calendar items"}
                    </span>
                    <span className="ml-2 font-bold text-white">
                        {filteredItems.length}
                    </span>
                </div>

                {grouped.overdue.length > 0 && (
                    <div className="rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-2 backdrop-blur-md">
                        <span className="text-xs text-rose-200">Overdue</span>
                        <span className="ml-2 font-bold text-white">
                            {grouped.overdue.length}
                        </span>
                    </div>
                )}

                {grouped.today.length > 0 && (
                    <div className="rounded-xl border border-emerald-300/20 bg-emerald-500/10 px-4 py-2 backdrop-blur-md">
                        <span className="text-xs text-emerald-200">Today</span>
                        <span className="ml-2 font-bold text-white">
                            {grouped.today.length}
                        </span>
                    </div>
                )}

                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            </div>

            {/* List */}
            <div className="pb-10">
                {loading ? (
                    <div className="grid grid-cols-1 gap-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-[68px] animate-pulse rounded-xl border border-white/10 bg-white/5"
                            />
                        ))}
                    </div>
                ) : filteredItems.length > 0 ? (
                    <div className="space-y-7">
                        {GROUPS.map(({ key, label, accent }) =>
                            grouped[key].length > 0 ? (
                                <section key={key}>
                                    <div className="mb-3 flex items-center gap-3">
                                        <h2 className={`text-sm font-semibold ${accent}`}>
                                            {label}
                                        </h2>
                                        <span className="text-xs text-purple-200/50">
                                            {grouped[key].length}
                                        </span>
                                        <div className="h-px flex-1 bg-white/10" />
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        {grouped[key].map((item) => (
                                            <CalendarItemCard
                                                key={item._id}
                                                id={item._id}
                                                title={item.title}
                                                description={item.description}
                                                dueDate={item.dueDate}
                                                status={item.status}
                                                onDelete={() => {
                                                    setDeleteItemId(item._id);
                                                    setShowDeleteModal(true);
                                                }}
                                                refetch={getMyCalendarItems}
                                            />
                                        ))}
                                    </div>
                                </section>
                            ) : null
                        )}
                    </div>
                ) : isSearching ? (
                    /* No search results */
                    <div
                        className="
                            flex min-h-[220px] flex-col items-center justify-center
                            rounded-3xl border border-dashed border-white/20
                            bg-white/5 text-center
                        "
                    >
                        <h3 className="text-lg font-semibold text-white">
                            No matches
                        </h3>
                        <p className="mt-2 max-w-sm text-sm text-purple-100/60">
                            Nothing on your calendar fits your search.
                        </p>
                        <button
                            onClick={() => setSearchTerm("")}
                            className="
                                mt-4 rounded-xl border border-white/20 px-4 py-2
                                text-sm font-semibold text-white transition
                                hover:bg-white/10
                            "
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    /* Empty state */
                    <div
                        className="
                            flex min-h-[320px] flex-col items-center justify-center
                            rounded-3xl border border-dashed border-white/20
                            bg-white/5 px-6 text-center backdrop-blur-sm
                        "
                    >
                        <div
                            className="
                                mb-4 flex h-16 w-16 items-center justify-center
                                rounded-2xl bg-purple-500/20 text-purple-200
                            "
                        >
                            <CalendarIcon className="h-8 w-8" />
                        </div>

                        <h3 className="text-lg font-semibold text-white">
                            Nothing scheduled.
                        </h3>

                        <p className="mt-2 max-w-sm text-sm text-purple-100/60">
                            Add things that only make sense on a specific day, like an appointment, a deadline, or a meeting.
                        </p>

                        <button
                            onClick={() => setShowAddItemModal(true)}
                            className="
                                mt-5 rounded-xl bg-purple-600 px-4 py-2 text-sm
                                font-semibold text-white transition hover:bg-purple-500
                            "
                        >
                            Add your first item
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

            {/* Add Modal */}
            <CreateCalendarItemModal
                show={showAddItemModal}
                onClose={() => setShowAddItemModal(false)}
                onSuccess={getMyCalendarItems}
            />
        </div>
    );
};

export default CalendarItemsComp;