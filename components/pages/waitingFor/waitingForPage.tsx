'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Clock } from "flowbite-react-icons/outline";
import { Button } from "flowbite-react";
import { toast } from "sonner";
import { getCookie } from "cookies-next";

import DeleteModal from "@/components/commonComponents/deleteModal";
import CreateWaitingForModal from "./modals/createWaitingForModal";
import WaitingForCard from "./waitingForCard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ⚠️ مقدار status را با چیزی که بک‌اند برای Waiting For استفاده می‌کند یکی کن
const WAITING_FOR_STATUS = "waiting_for";

type WaitingItem = {
    _id: string;
    title: string;
    description: string;
    user: string;
    status: string;
    delegatedTo: string;
};

const WaitingForComp = () => {
    const [items, setItems] = useState<WaitingItem[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState("");
    const [showAddItemModal, setShowAddItemModal] = useState(false);

    const getWaitingItems = useCallback(async () => {
        try {
            const token = getCookie("access_token");

            const res = await fetch(
                `${API_BASE_URL}/inbox/user-items?status=${WAITING_FOR_STATUS}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            toast.error("Couldn't load your Waiting For items. Try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getWaitingItems();
    }, [getWaitingItems]);

    /* People you're waiting on (unique, with counts) */
    const people = useMemo(() => {
        const counts = new Map<string, number>();
        items.forEach((item) => {
            const name = item.delegatedTo?.trim();
            if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
        });
        return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
    }, [items]);

    const filteredItems = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();

        return items.filter((item) => {
            const matchesPerson =
                !selectedPerson || item.delegatedTo?.trim() === selectedPerson;

            const matchesSearch =
                !q ||
                item.title?.toLowerCase().includes(q) ||
                item.description?.toLowerCase().includes(q) ||
                item.delegatedTo?.toLowerCase().includes(q);

            return matchesPerson && matchesSearch;
        });
    }, [items, searchTerm, selectedPerson]);

    const hasFilters = !!searchTerm || !!selectedPerson;

    return (
        <div className="min-h-screen p-5 md:p-8">

            {/* Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="mb-1 text-sm font-medium text-purple-200">
                        GTD • Organize
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                        Waiting For
                    </h1>

                    <p className="mt-2 text-sm text-purple-100/70">
                        Things you've handed off. Follow up until they come back.
                    </p>
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
                    New Waiting For
                </Button>
            </div>

            {/* Search */}
            <div className="mb-4">
                <div
                    className="
                        group relative flex w-full items-center overflow-hidden
                        rounded-2xl border border-white/10 bg-white/[0.07]
                        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                        transition-all duration-300
                        focus-within:border-purple-300/40
                        focus-within:bg-white/[0.10]
                        focus-within:shadow-[0_8px_35px_rgba(168,85,247,0.12)]
                    "
                >
                    <div
                        className="
                            flex h-11 w-11 shrink-0 items-center justify-center
                            text-purple-200/60 transition
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

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by task or person..."
                        className="
                            min-w-0 flex-1 bg-transparent py-3 pr-3 text-sm
                            text-white outline-none placeholder:text-purple-100/40
                        "
                    />

                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            title="Clear search"
                            aria-label="Clear search"
                            className="
                                mr-2 flex h-7 w-7 shrink-0 items-center justify-center
                                rounded-lg text-purple-200/50 transition
                                hover:bg-white/10 hover:text-white
                            "
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
            </div>

            {/* Filter by person */}
            {people.length > 0 && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setSelectedPerson(null)}
                        className={`
                            rounded-full border px-3 py-1 text-xs font-medium transition
                            ${!selectedPerson
                                ? "border-purple-300 bg-purple-500/30 text-white"
                                : "border-white/10 bg-white/5 text-purple-100/70 hover:bg-white/10"}
                        `}
                    >
                        Everyone
                    </button>

                    {people.map(([name, count]) => (
                        <button
                            key={name}
                            onClick={() =>
                                setSelectedPerson(selectedPerson === name ? null : name)
                            }
                            className={`
                                flex items-center gap-1.5 rounded-full border px-3 py-1
                                text-xs font-medium transition
                                ${selectedPerson === name
                                    ? "border-purple-300 bg-purple-500/30 text-white"
                                    : "border-white/10 bg-white/5 text-purple-100/70 hover:bg-white/10"}
                            `}
                        >
                            {name}
                            <span className="text-purple-200/60">{count}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Stats */}
            <div className="mb-7 flex flex-wrap items-center gap-3">
                <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                    <span className="text-xs text-purple-200">
                        {hasFilters ? "Matching" : "Waiting"}
                    </span>
                    <span className="ml-2 font-bold text-white">
                        {filteredItems.length}
                    </span>
                </div>

                {people.length > 0 && (
                    <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                        <span className="text-xs text-purple-200">People</span>
                        <span className="ml-2 font-bold text-white">{people.length}</span>
                    </div>
                )}

                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-3 pb-10">
                {loading ? (
                    /* Loading skeleton */
                    Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-[68px] animate-pulse rounded-xl border border-white/10 bg-white/5"
                        />
                    ))
                ) : filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <WaitingForCard
                            key={item._id}
                            id={item._id}
                            title={item.title}
                            description={item.description}
                            delegatedTo={item.delegatedTo}
                            status={item.status}
                            onDelete={() => {
                                setDeleteItemId(item._id);
                                setShowDeleteModal(true);
                            }}
                            refetch={getWaitingItems}
                        />
                    ))
                ) : hasFilters ? (
                    /* No results */
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
                            Nothing fits your search or filter.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedPerson(null);
                            }}
                            className="
                                mt-4 rounded-xl border border-white/20 px-4 py-2
                                text-sm font-semibold text-white transition
                                hover:bg-white/10
                            "
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    /* Empty state */
                    <div
                        className="
                            flex min-h-[300px] flex-col items-center justify-center
                            rounded-3xl border border-dashed border-white/20
                            bg-white/5 text-center backdrop-blur-sm
                        "
                    >
                        <div
                            className="
                                mb-4 flex h-16 w-16 items-center justify-center
                                rounded-2xl bg-purple-500/20 text-purple-200
                            "
                        >
                            <Clock size={30} />
                        </div>

                        <h3 className="text-lg font-semibold text-white">
                            You're not waiting on anyone.
                        </h3>

                        <p className="mt-2 max-w-sm text-sm text-purple-100/60">
                            When you delegate a task, add it here so you can follow up on it.
                        </p>

                        <button
                            onClick={() => setShowAddItemModal(true)}
                            className="
                                mt-5 rounded-xl bg-purple-600 px-4 py-2 text-sm
                                font-semibold text-white transition hover:bg-purple-500
                            "
                        >
                            Add a Waiting For item
                        </button>
                    </div>
                )}
            </div>

            {/* Delete Modal */}
            <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                url={`/inbox/items/${deleteItemId}`}
                onSuccess={getWaitingItems}
            />

            {/* Add Modal */}
            <CreateWaitingForModal
                show={showAddItemModal}
                onClose={() => setShowAddItemModal(false)}
                onSuccess={getWaitingItems}
            />
        </div>
    );
};

export default WaitingForComp;