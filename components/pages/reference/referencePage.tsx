'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "flowbite-react-icons/outline";
import { Button } from "flowbite-react";
import { toast } from "sonner";
import { getCookie } from "cookies-next";

import DeleteModal from "@/components/commonComponents/deleteModal";
import SearchComponent from "@/components/commonComponents/searchComponent";
import ReferenceCard from "./referenceCard";
import CreateReferenceModal from "./modals/createReference";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type ReferenceItem = {
    _id: string;
    title: string;
    description: string;
    user: string;
};

/* Inline icon so we don't depend on an icon name that may not exist */
const BookmarkIcon = ({ className = "h-7 w-7" }: { className?: string }) => (
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
            d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3.75L6 21V4.75Z"
        />
    </svg>
);

const ReferenceComp = () => {
    const [items, setItems] = useState<ReferenceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState("");
    const [showAddItemModal, setShowAddItemModal] = useState(false);

    const getMyReference = useCallback(async () => {
        try {
            const token = getCookie("access_token");

            const res = await fetch(`${API_BASE_URL}/inbox/user-items?status=reference`, {
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
            toast.error("Couldn't load your References. Try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getMyReference();
    }, [getMyReference]);

    const filteredItems = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        if (!q) return items;

        return items.filter(
            (item) =>
                item.title?.toLowerCase().includes(q) ||
                item.description?.toLowerCase().includes(q)
        );
    }, [items, searchTerm]);

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
                            bg-gradient-to-br from-purple-400/30 to-sky-500/20
                            text-purple-100 shadow-lg shadow-purple-950/20
                            backdrop-blur-md sm:flex
                        "
                    >
                        <BookmarkIcon />
                    </div>

                    <div>
                        <p className="mb-1 text-sm font-medium text-purple-200">
                            GTD • Organize
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                            Reference
                        </h1>

                        <p className="mt-2 text-sm text-purple-100/70">
                            Information you want to keep. Nothing to do, just easy to find.
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
                    New Reference
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
                        {isSearching ? "Matching" : "References"}
                    </span>
                    <span className="ml-2 font-bold text-white">
                        {filteredItems.length}
                    </span>
                </div>

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
                        <ReferenceCard
                            key={item._id}
                            id={item._id}
                            title={item.title}
                            description={item.description}
                            onDelete={() => {
                                setDeleteItemId(item._id);
                                setShowDeleteModal(true);
                            }}
                        />
                    ))
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
                            Nothing in Reference fits your search.
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
                            <BookmarkIcon className="h-8 w-8" />
                        </div>

                        <h3 className="text-lg font-semibold text-white">
                            No references yet.
                        </h3>

                        <p className="mt-2 max-w-sm text-sm text-purple-100/60">
                            Save things you may need to look up later, like a login hint, a recipe, an article, or meeting notes.
                        </p>

                        <button
                            onClick={() => setShowAddItemModal(true)}
                            className="
                                mt-5 rounded-xl bg-purple-600 px-4 py-2 text-sm
                                font-semibold text-white transition hover:bg-purple-500
                            "
                        >
                            Add your first reference
                        </button>
                    </div>
                )}
            </div>

            {/* Delete Modal */}
            <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                url={`/inbox/items/${deleteItemId}`}
                onSuccess={getMyReference}
            />

            {/* Add Modal */}
            <CreateReferenceModal
                show={showAddItemModal}
                onClose={() => setShowAddItemModal(false)}
                onSuccess={getMyReference}
            />
        </div>
    );
};

export default ReferenceComp;