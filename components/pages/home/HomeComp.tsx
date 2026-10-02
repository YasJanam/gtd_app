'use client'

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
    Inbox,
    Play,
    Hourglass,
    QuestionCircle,
    Folder,
    BookOpen,
    CalendarWeek,
    ArrowRight,
    Check,
} from "flowbite-react-icons/outline";
import { getCookie } from "cookies-next";
import SectionCard from "./section";
import ProgressRing from "./charts/dailyProgressRing";
import QuickCapture from "./quikCapture";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const TODAY_PATH = "/inbox/user-items/toady";

type InboxItemType = {
    _id: string;
    title: string;
    description: string;
    status: string;
    done: boolean;
    dueDate?: string | null;
};

type AlertItem = {
    id: string;
    text: string;
    href: string;
    level: "warn" | "danger";
};

type Tone = {
    tile: string;
    count: string;
    bar: string;
    glow: string;
};

type Section = {
    key: string;
    name: string;
    hint: string;
    href: string;
    icon: React.ReactNode;
    tone: Tone;
};

const TONES = {
    purple: {
        tile: "from-purple-400 to-fuchsia-500 shadow-purple-500/40",
        count: "text-purple-200",
        bar: "from-purple-400 to-fuchsia-400",
        glow: "bg-purple-400/30",
    },
    blue: {
        tile: "from-sky-400 to-blue-500 shadow-sky-500/40",
        count: "text-sky-200",
        bar: "from-sky-400 to-blue-400",
        glow: "bg-sky-400/30",
    },
    emerald: {
        tile: "from-emerald-400 to-teal-500 shadow-emerald-500/40",
        count: "text-emerald-200",
        bar: "from-emerald-400 to-teal-400",
        glow: "bg-emerald-400/30",
    },
    amber: {
        tile: "from-amber-400 to-orange-500 shadow-amber-500/40",
        count: "text-amber-200",
        bar: "from-amber-400 to-orange-400",
        glow: "bg-amber-400/30",
    },
    indigo: {
        tile: "from-indigo-400 to-violet-500 shadow-indigo-500/40",
        count: "text-indigo-200",
        bar: "from-indigo-400 to-violet-400",
        glow: "bg-indigo-400/30",
    },
    rose: {
        tile: "from-rose-400 to-pink-500 shadow-rose-500/40",
        count: "text-rose-200",
        bar: "from-rose-400 to-pink-400",
        glow: "bg-rose-400/30",
    },
} satisfies Record<string, Tone>;

const INBOX: Section = {
    key: "inbox",
    name: "Inbox",
    hint: "Everything you captured and haven't decided on yet.",
    href: "/inbox",
    icon: <Inbox size={26} />,
    tone: TONES.purple,
};

const DO_SECTIONS: Section[] = [
    { key: "next_action", name: "Next Actions", hint: "Steps you can take right now.", href: "/next-actions", icon: <Play size={20} />, tone: TONES.blue },
    { key: "calendar", name: "Calendar", hint: "Things tied to a specific day.", href: "/calendar-items", icon: <CalendarWeek size={20} />, tone: TONES.emerald },
    { key: "waiting_for", name: "Waiting For", hint: "Handed off, still to follow up.", href: "/waiting-for", icon: <Hourglass size={20} />, tone: TONES.amber },
];

const KEEP_SECTIONS: Section[] = [
    { key: "project", name: "Projects", hint: "Outcomes that need more than one step.", href: "/projects", icon: <Folder size={20} />, tone: TONES.indigo },
    { key: "someday", name: "Someday / Maybe", hint: "Ideas worth keeping, not doing yet.", href: "/someday", icon: <QuestionCircle size={20} />, tone: TONES.rose },
    { key: "reference", name: "Reference", hint: "Information to keep and find later.", href: "/reference", icon: <BookOpen size={20} />, tone: TONES.purple },
];

/* ---------- Today item helpers ---------- */

type Kind = "overdue" | "calendar" | "next_action";

const KIND_STYLE: Record<Kind, { badge: string; dot: string }> = {
    overdue: { badge: "bg-rose-500/25 text-rose-100 ring-rose-400/40", dot: "bg-rose-400" },
    calendar: { badge: "bg-emerald-500/25 text-emerald-100 ring-emerald-400/40", dot: "bg-emerald-400" },
    next_action: { badge: "bg-sky-500/25 text-sky-100 ring-sky-400/40", dot: "bg-sky-400" },
};

const DAY_MS = 86_400_000;

const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();


const describeItem = (item: InboxItemType): { kind: Kind; label: string } => {
    if (item.status !== "calendar") {
        return { kind: "next_action", label: "Next action" };
    }

    const due = item.dueDate ? new Date(item.dueDate) : null;
    if (!due || isNaN(due.getTime())) {
        return { kind: "calendar", label: "Today" };
    }

    const diff = Math.round((startOfDay(due) - startOfDay(new Date())) / DAY_MS);

    if (diff < 0) {
        return {
            kind: "overdue",
            label: diff === -1 ? "Yesterday" : `${Math.abs(diff)}d overdue`,
        };
    }

    if (diff > 0) {
        return {
            kind: "calendar",
            label: due.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        };
    }

    /* Date-only items are stored at 12:00, so don't show a fake time */
    const hasRealTime = !(due.getHours() === 12 && due.getMinutes() === 0);
    const time = due.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

    return { kind: "calendar", label: hasRealTime ? `Today · ${time}` : "Today" };
};

const getGreeting = (h: number) =>
    h < 5 ? "Working late" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";

const authFetch = (path: string, init: RequestInit = {}) => {
    const token = getCookie("access_token");

    return fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            ...init.headers,
        },
    });
};

const GroupTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="mb-4 flex items-baseline gap-3">
        <h2 className="text-base font-bold text-white">{title}</h2>
        <span className="text-xs text-purple-100/60">{subtitle}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
    </div>
);



/* ---------- Page ---------- */

const HomeComponent = () => {
    const [now, setNow] = useState<Date | null>(null);
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [today, setToday] = useState<InboxItemType[]>([]);
    const [busyId, setBusyId] = useState<string | null>(null);

    useEffect(() => {
        setNow(new Date());
    }, []);

    const getKindCount = useCallback(async () => {
        try {
            const res = await authFetch("/inbox/user-items/kind-count");
            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
            setCounts(data ?? {});
        } catch (error) {
            console.error(error);
            toast.error("Couldn't load your counts. Try again.");
        }
    }, []);

    const getTodayItems = useCallback(async () => {
        try {
            const res = await authFetch(TODAY_PATH);
            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
            setToday(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            toast.error("Couldn't load today's items. Try again.");
        }
    }, []);


    /*const getMoreTodayItems =async () => {
        try {
            const res = await authFetch(TODAY_PATH);
            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
            setToday(Array.isArray(data) ? [...today,...data] : today);
        } catch (error) {
            console.error(error);
            toast.error("Couldn't load today's items. Try again.");
        }
    };*/

    useEffect(() => {
        getKindCount();
        getTodayItems();
    }, [getKindCount, getTodayItems]);

    const handleCapture = async (text: string) => {
        try {
            const res = await authFetch("/inbox/items", {
                method: "POST",
                body: JSON.stringify({
                    title: text,
                    description: "",
                    user: localStorage.getItem("user_id"),
                    status: "inbox", 
                }),
            });

            if (!res.ok) throw new Error("Request failed");

            toast.success("Captured to Inbox.");
            getKindCount();
        } catch (error) {
            console.error(error);
            toast.error("Couldn't capture that. Try again.");
        }
    };


    const markDone = async (id: string) => {
        try {
            setBusyId(id);

            const res = await authFetch(`/inbox/items/${id}/done`, { method: "PATCH" });
            if (!res.ok) throw new Error("Request failed");


            await Promise.all([getTodayItems(), getKindCount()]);
        } catch (error) {
            console.error(error);
            toast.error("Couldn't mark that as done. Try again.");
        } finally {
            setBusyId(null);
        }
    };

    const doneCount = today.filter((i) => i.done).length;
    const allDone = today.length > 0 && doneCount === today.length;

    const inboxCount = counts[INBOX.key] ?? 0;
    const hasInbox = inboxCount > 0;

    /* Alerts are built from the page's own data */
    const alerts = useMemo(() => {
        const list: AlertItem[] = [];

        const overdue = today.filter(
            (i) => !i.done && describeItem(i).kind === "overdue"
        ).length;

        if (overdue > 0) {
            list.push({
                id: "overdue",
                text: `${overdue} overdue ${overdue === 1 ? "item" : "items"}`,
                href: "/calendar-items",
                level: "danger",
            });
        }

        if (inboxCount >= 10) {
            list.push({
                id: "inbox",
                text: `${inboxCount} items waiting in Inbox`,
                href: "/inbox",
                level: "warn",
            });
        }

        return list;
    }, [today, inboxCount]);

    return (
        <div className="px-3 py-5 md:px-5">

            {/* Header */}
            <div className="mb-6">
                <p className="mb-1 text-sm font-medium text-purple-200">
                    {now
                        ? now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                        : "GTD • Dashboard"}
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                    {now ? getGreeting(now.getHours()) : "Welcome"}
                </h1>
            </div>

            {/* Quick capture */}
            <QuickCapture onCapture={handleCapture} />

            {/* Alerts */}
            {alerts.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-2">
                    {alerts.map((a) => (
                        <Link
                            key={a.id}
                            href={a.href}
                            className={`
                                inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5
                                text-xs font-semibold text-white transition hover:brightness-125
                                ${a.level === "danger"
                                    ? "border-rose-400/50 bg-rose-500/30"
                                    : "border-amber-400/50 bg-amber-500/30"}
                            `}
                        >
                            <span
                                className={`h-2 w-2 rounded-full ${
                                    a.level === "danger" ? "bg-rose-300" : "bg-amber-300"
                                }`}
                            />
                            {a.text}
                            <ArrowRight size={12} />
                        </Link>
                    ))}
                </div>
            )}

            {/* Today + progress */}
            <section className="mb-10">
                <GroupTitle title="Today" subtitle="Your focus for the day" />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_16rem]">

                    {/* Today list */}
                    <div className="rounded-2xl border border-white/15 bg-white/[0.09] p-2 shadow-lg shadow-black/10 backdrop-blur-md">
                        {today.length === 0 ? (
                            <p className="px-4 py-8 text-center text-sm text-purple-100/70">
                                Nothing planned for today. Pick a next action to get started.
                            </p>
                        ) : (
                            <ul className="divide-y divide-white/10">
                                {today.map((item) => {
                                    const { kind, label } = describeItem(item);

                                    return (
                                        <li key={item._id} className="flex items-center gap-3 px-3 py-3">
                                            <button
                                                onClick={() => markDone(item._id)}
                                                disabled={item.done || busyId === item._id}
                                                aria-label={item.done ? "Done" : "Mark as done"}
                                                className={`
                                                    flex h-7 w-7 shrink-0 items-center justify-center rounded-full
                                                    border-2 transition-all duration-200
                                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300
                                                    disabled:cursor-default
                                                    ${item.done
                                                        ? "border-emerald-400 bg-emerald-400 text-white shadow-md shadow-emerald-500/40"
                                                        : "border-white/40 text-transparent hover:border-emerald-300 hover:text-emerald-300 disabled:opacity-50"}
                                                `}
                                            >
                                                <Check size={14} />
                                            </button>

                                            <p
                                                className={`min-w-0 flex-1 truncate text-sm font-medium transition ${
                                                    item.done ? "text-white/40 line-through" : "text-white"
                                                }`}
                                            >
                                                {item.title}
                                            </p>

                                            <span
                                                className={`
                                                    flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1
                                                    text-[11px] font-semibold ring-1 ring-inset
                                                    ${item.done
                                                        ? "bg-white/5 text-white/35 ring-white/10"
                                                        : KIND_STYLE[kind].badge}
                                                `}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${
                                                        item.done ? "bg-white/25" : KIND_STYLE[kind].dot
                                                    }`}
                                                />
                                                {label}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* Progress */}
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.12] to-white/[0.06] p-5 text-center shadow-lg shadow-black/10 backdrop-blur-md">
                        <ProgressRing done={doneCount} total={today.length} />

                        <p className="mt-3 text-sm font-bold text-white">
                            {allDone ? "All clear for today 🎉" : "Keep going"}
                        </p>
                        <p className="mt-0.5 text-xs text-purple-100/75">
                            {allDone
                                ? "Capture anything new or take a break."
                                : `${today.length - doneCount} left to finish`}
                        </p>
                    </div>
                </div>
            </section>

            {/* Inbox banner */}
            <Link
                href={INBOX.href}
                className="
                    group relative mb-10 flex flex-col gap-4 overflow-hidden
                    rounded-3xl border border-white/25
                    bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600
                    p-5 shadow-2xl shadow-purple-950/40
                    transition-all duration-300 hover:-translate-y-0.5 hover:shadow-purple-500/40
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                    sm:flex-row sm:items-center sm:justify-between md:p-6
                "
            >
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-fuchsia-400/30 blur-3xl" />

                <div className="relative flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/25 text-white ring-1 ring-inset ring-white/40">
                        {INBOX.icon}
                    </div>

                    <div>
                        <div className="flex items-baseline gap-2.5">
                            <span className="text-4xl font-bold leading-none text-white md:text-5xl">
                                {inboxCount}
                            </span>
                            <span className="text-sm font-medium text-purple-50">
                                {inboxCount === 1 ? "item in Inbox" : "items in Inbox"}
                            </span>
                        </div>

                        <p className="mt-1.5 text-xs text-purple-100/90">
                            {hasInbox
                                ? "Decide what each one is, then move it where it belongs."
                                : "Nothing waiting. Capture anything new that comes to mind."}
                        </p>
                    </div>
                </div>

                <span
                    className="
                        relative inline-flex items-center gap-2 self-start rounded-xl
                        bg-white px-5 py-2.5 text-sm font-bold text-purple-700
                        shadow-lg shadow-purple-950/30 transition-all duration-200
                        group-hover:-translate-y-0.5 sm:self-auto
                    "
                >
                    {hasInbox ? "Clarify now" : "Open Inbox"}
                    <ArrowRight size={15} />
                </span>
            </Link>

            {/* Do */}
            <section className="mb-10">
                <GroupTitle title="Do" subtitle="What needs your attention" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {DO_SECTIONS.map((s) => (
                        <SectionCard key={s.key} section={s} count={counts[s.key] ?? 0} />
                    ))}
                </div>
            </section>

            {/* Keep */}
            <section className="pb-6">
                <GroupTitle title="Keep" subtitle="Bigger outcomes and things for later" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {KEEP_SECTIONS.map((s) => (
                        <SectionCard key={s.key} section={s} count={counts[s.key] ?? 0} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomeComponent;