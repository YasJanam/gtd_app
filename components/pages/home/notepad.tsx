
// 'use client'

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//     Inbox,
//     Play,
//     Hourglass,
//     QuestionCircle,
//     Folder,
//     BookOpen,
//     CalendarWeek,
//     ArrowRight,
// } from "flowbite-react-icons/outline";

// /* ⚠️ عددهای الکی: بعداً با مقدار واقعی جایگزین کن */
// const COUNTS: Record<string, number> = {
//     inbox: 12,
//     next_action: 8,
//     calendar: 5,
//     waiting_for: 3,
//     project: 4,
//     someday: 9,
//     reference: 21,
// };

// /* ⚠️ href ها را با روت‌های پروژه‌ات یکی کن */
// type Tone = {
//     tile: string;
//     glow: string;
// };

// type Section = {
//     key: string;
//     name: string;
//     hint: string;
//     href: string;
//     icon: React.ReactNode;
//     tone: Tone;
// };

// const TONES = {
//     purple: { tile: "bg-purple-400/20 text-purple-200 ring-purple-300/30", glow: "bg-purple-400/20" },
//     blue: { tile: "bg-sky-400/20 text-sky-200 ring-sky-300/30", glow: "bg-sky-400/20" },
//     emerald: { tile: "bg-emerald-400/20 text-emerald-200 ring-emerald-300/30", glow: "bg-emerald-400/20" },
//     amber: { tile: "bg-amber-400/20 text-amber-200 ring-amber-300/30", glow: "bg-amber-400/20" },
//     indigo: { tile: "bg-indigo-400/20 text-indigo-200 ring-indigo-300/30", glow: "bg-indigo-400/20" },
//     slate: { tile: "bg-slate-400/20 text-slate-200 ring-slate-300/30", glow: "bg-slate-400/20" },
// } satisfies Record<string, Tone>;

// const INBOX: Section = {
//     key: "inbox",
//     name: "Inbox",
//     hint: "Everything you captured and haven't decided on yet.",
//     href: "/inbox",
//     icon: <Inbox size={26} />,
//     tone: TONES.purple,
// };

// const DO_SECTIONS: Section[] = [
//     {
//         key: "next_action",
//         name: "Next Actions",
//         hint: "Steps you can take right now.",
//         href: "/next-actions",
//         icon: <Play size={20} />,
//         tone: TONES.blue,
//     },
//     {
//         key: "calendar",
//         name: "Calendar",
//         hint: "Things tied to a specific day.",
//         href: "/calendar",
//         icon: <CalendarWeek size={20} />,
//         tone: TONES.emerald,
//     },
//     {
//         key: "waiting_for",
//         name: "Waiting For",
//         hint: "Handed off, still to follow up.",
//         href: "/waiting-for",
//         icon: <Hourglass size={20} />,
//         tone: TONES.amber,
//     },
// ];

// const KEEP_SECTIONS: Section[] = [
//     {
//         key: "project",
//         name: "Projects",
//         hint: "Outcomes that need more than one step.",
//         href: "/projects",
//         icon: <Folder size={20} />,
//         tone: TONES.indigo,
//     },
//     {
//         key: "someday",
//         name: "Someday / Maybe",
//         hint: "Ideas worth keeping, not doing yet.",
//         href: "/someday",
//         icon: <QuestionCircle size={20} />,
//         tone: TONES.purple,
//     },
//     {
//         key: "reference",
//         name: "Reference",
//         hint: "Information to keep and find later.",
//         href: "/reference",
//         icon: <BookOpen size={20} />,
//         tone: TONES.slate,
//     },
// ];

// const getGreeting = (h: number) =>
//     h < 5 ? "Working late" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";

// const SectionCard = ({ section }: { section: Section }) => (
//     <Link
//         href={section.href}
//         className="
//             group relative flex flex-col justify-between overflow-hidden
//             rounded-2xl border border-white/10 bg-white/[0.06]
//             p-5 backdrop-blur-md
//             transition-all duration-300
//             hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.10]
//             focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300
//         "
//     >
//         <div
//             className={`
//                 pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full
//                 blur-3xl opacity-0 transition-opacity duration-300
//                 group-hover:opacity-100 ${section.tone.glow}
//             `}
//         />

//         <div className="relative flex items-start justify-between">
//             <div
//                 className={`
//                     flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset
//                     ${section.tone.tile}
//                 `}
//             >
//                 {section.icon}
//             </div>

//             <span className="text-3xl font-bold leading-none text-white">
//                 {COUNTS[section.key]}
//             </span>
//         </div>

//         <div className="relative mt-6">
//             <div className="flex items-center justify-between">
//                 <h3 className="text-base font-semibold text-white">{section.name}</h3>
//                 <ArrowRight
//                     size={16}
//                     className="text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-white"
//                 />
//             </div>
//             <p className="mt-1 text-xs leading-5 text-purple-100/60">{section.hint}</p>
//         </div>
//     </Link>
// );

// const GroupTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
//     <div className="mb-3 flex items-baseline gap-3">
//         <h2 className="text-sm font-semibold text-purple-100">{title}</h2>
//         <span className="text-xs text-purple-200/50">{subtitle}</span>
//         <div className="h-px flex-1 bg-white/10" />
//     </div>
// );

// const HomeComponent = () => {
//     const [now, setNow] = useState<Date | null>(null);

//     useEffect(() => {
//         setNow(new Date());
//     }, []);

//     const inboxCount = COUNTS[INBOX.key];
//     const hasInbox = inboxCount > 0;

//     return (
//         <div className="px-3 py-5 md:px-5">

//             {/* Header */}
//             <div className="mb-8">
//                 <p className="mb-1 text-sm font-medium text-purple-200">
//                     {now
//                         ? now.toLocaleDateString("en-US", {
//                               weekday: "long",
//                               month: "long",
//                               day: "numeric",
//                           })
//                         : "GTD • Dashboard"}
//                 </p>

//                 <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
//                     {now ? getGreeting(now.getHours()) : "Welcome"}
//                 </h1>

//                 <p className="mt-2 text-sm text-purple-100/70">
//                     Start from your Inbox, then pick what to do next.
//                 </p>
//             </div>

//             {/* Inbox banner */}
//             <Link
//                 href={INBOX.href}
//                 className="
//                     group relative mb-9 flex flex-col gap-5 overflow-hidden
//                     rounded-3xl border border-white/15
//                     bg-gradient-to-br from-purple-500/30 via-purple-600/20 to-indigo-600/20
//                     p-6 shadow-xl shadow-purple-950/20 backdrop-blur-md
//                     transition-all duration-300
//                     hover:border-white/30
//                     focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300
//                     sm:flex-row sm:items-center sm:justify-between md:p-8
//                 "
//             >
//                 <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-purple-300/20 blur-3xl" />

//                 <div className="relative flex items-center gap-5">
//                     <div
//                         className="
//                             flex h-14 w-14 shrink-0 items-center justify-center
//                             rounded-2xl bg-white/15 text-white ring-1 ring-inset ring-white/20
//                         "
//                     >
//                         {INBOX.icon}
//                     </div>

//                     <div>
//                         <p className="text-sm text-purple-100/80">Inbox</p>

//                         <div className="mt-0.5 flex items-baseline gap-2.5">
//                             <span className="text-4xl font-bold leading-none text-white md:text-5xl">
//                                 {inboxCount}
//                             </span>
//                             <span className="text-sm text-purple-100/80">
//                                 {inboxCount === 1 ? "item to clarify" : "items to clarify"}
//                             </span>
//                         </div>

//                         <p className="mt-2 text-xs text-purple-100/60">
//                             {hasInbox
//                                 ? "Decide what each one is, then move it where it belongs."
//                                 : "Nothing waiting. Capture anything new that comes to mind."}
//                         </p>
//                     </div>
//                 </div>

//                 <span
//                     className="
//                         relative inline-flex items-center gap-2 self-start rounded-xl
//                         bg-white px-4 py-2.5 text-sm font-semibold text-purple-700
//                         shadow-lg shadow-purple-950/20 transition-all duration-200
//                         group-hover:-translate-y-0.5 sm:self-auto
//                     "
//                 >
//                     {hasInbox ? "Clarify now" : "Open Inbox"}
//                     <ArrowRight size={15} />
//                 </span>
//             </Link>

//             {/* Do */}
//             <section className="mb-9">
//                 <GroupTitle title="Do" subtitle="What needs your attention" />
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                     {DO_SECTIONS.map((s) => (
//                         <SectionCard key={s.key} section={s} />
//                     ))}
//                 </div>
//             </section>

//             {/* Keep */}
//             <section className="pb-6">
//                 <GroupTitle title="Keep" subtitle="Bigger outcomes and things for later" />
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                     {KEEP_SECTIONS.map((s) => (
//                         <SectionCard key={s.key} section={s} />
//                     ))}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default HomeComponent;









        {/*<GtdCommonModal 
        show={showActionable}
        onClose={() => setShowActionsble(false)}
        title ={'actionable'}
        text = {'is it actionable'}
        icon = {<BellActive/>}
        yesAction={() => {setShowActionsble(false);setShowActionsCount(true)}}
        noAction={() => {setShowActionsble(false);setShowMaybe(true)}}
        itemTitle={itemTitle}
        itemDescription={itemDescription}

        />


        <GtdCommonModal 
        show={showActionsCount}
        onClose={() => setShowActionsCount(false)}
        title ={'action count'}
        text = {'Does it have several actions?'}
        icon = {<BellActive/>}
        yesAction={() => {setShowActionsble(false);createProject()}}
        noAction={() => {setShowActionsble(false);setShowLessThan2Min(true)}}
        itemTitle={itemTitle}
        itemDescription={itemDescription}
        />


        <GtdCommonModal 
        show={showLessThan2Min}
        onClose={() => setShowLessThan2Min(false)}
        title ={'less than 2 minutes'}
        text = {'Does it take less than 2 minutes ?'}
        icon = {<Clock/>}
        yesAction={() => {setShowLessThan2Min(false);nowDoIt();}}
        noAction={() => {setShowLessThan2Min(false);setShowDoByMyself(true)}}
        itemTitle={itemTitle}
        itemDescription={itemDescription}
        />

        <GtdCommonModal
        show={showDoByMyself}
        onClose={() => setShowDoByMyself(false)}
        title ={'do by myself'}
        text = {'Do I have to do it myself ?'}
        icon = {<PersonChalkboard/>}
        yesAction={() => {setShowDoByMyself(false);setShowCalendarItem(true);}}
        noAction={() => {setShowDoByMyself(false);createWaitingFor();}}
        itemTitle={itemTitle}
        itemDescription={itemDescription}
        />

        <GtdCommonModal
        show={showCalendarItem}
        onClose={() => setShowCalendarItem(false)}
        title ={'calendar item'}
        text = {'Does it have a specific date ?'}
        icon = {<CalendarWeek/>}
        yesAction={() => {setShowCalendarItem(false);createCalendarItem();}}
        noAction={() => {setShowCalendarItem(false);createNextAction();}}
        itemTitle={itemTitle}
        itemDescription={itemDescription}
        />

        <GtdCommonModal
        show={showMaybe}
        onClose={() => setShowMaybe(false)}
        title ={'someday/maybe'}
        text = {"Is it possible that someday I'll do it?"}
        icon = {<TruckClock/>}
        yesAction={() => {setShowMaybe(false);createSomedayItem();}}
        noAction={() => {setShowMaybe(false);setShowImportance(true);}}
        itemTitle={itemTitle}
        itemDescription={itemDescription}
        />

        <GtdCommonModal
        show={showImportance}
        onClose={() => setShowImportance(false)}
        title ={'refrence / trash'}
        text = {"Does it matter ? "}
        icon = {<TrashBin/>}
        yesAction={() => {setShowImportance(false);createReference();}}
        noAction={() => {setShowImportance(false);goToTrash();}}
        itemTitle={itemTitle}
        itemDescription={itemDescription}
        />*/}
