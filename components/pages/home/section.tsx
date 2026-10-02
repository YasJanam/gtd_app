
'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


import Link from "next/link";
import { useEffect, useState } from "react";
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


type Tone = {
    tile: string;   // solid gradient icon tile
    count: string;  // count color
    bar: string;    // top accent bar
    glow: string;   // hover glow
};

type Section = {
    key: string;
    name: string;
    hint: string;
    href: string;
    icon: React.ReactNode;
    tone: Tone;
};


const SectionCard = ({ section, count }: { section: Section; count: number }) => (
    <Link
        href={section.href}
        className="
            group relative flex flex-col justify-between overflow-hidden
            rounded-2xl border border-white/15 bg-white/[0.09] p-5
            shadow-lg shadow-black/10 backdrop-blur-md
            transition-all duration-300
            hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.14]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
        "
    >
        {/* Top color bar */}
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${section.tone.bar}`} />

        {/* Glow */}
        <div
            className={`
                pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full
                blur-3xl opacity-40 transition-opacity duration-300
                group-hover:opacity-90 ${section.tone.glow}
            `}
        />

        <div className="relative flex items-start justify-between">
            <div
                className={`
                    flex h-12 w-12 items-center justify-center rounded-xl
                    bg-gradient-to-br text-white shadow-lg ${section.tone.tile}
                `}
            >
                {section.icon}
            </div>
            <span className={`text-4xl font-bold leading-none ${section.tone.count}`}>
                {count}
            </span>
        </div>

        <div className="relative mt-6">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">{section.name}</h3>
                <ArrowRight
                    size={16}
                    className="text-white/50 transition-all group-hover:translate-x-1 group-hover:text-white"
                />
            </div>
            <p className="mt-1 text-xs leading-5 text-purple-100/75">{section.hint}</p>
        </div>
    </Link>
);


export default SectionCard;