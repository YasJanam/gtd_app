'use client'

import { useRouter } from "next/navigation"
import { useState } from "react";


type Probs = {
    id:string,
    name: string,
    notes:string,
    outcome:string
    onDelete:() => void,

}

const ProjectCard = ({id,name,notes,outcome,onDelete}:Probs) => {
    const router = useRouter();
    const [showAll,setShowAll] = useState(false);


    return (<>

        <div
        className="
            group relative overflow-hidden
            rounded-2xl
            border border-purple-100
            bg-white
            p-5
            shadow-sm
            transition-all duration-300
            hover:-translate-y-1
            hover:border-purple-300
            hover:shadow-[0_12px_35px_rgba(88,28,135,0.15)]
        "
        >

        {/* Decorative glow */}
        <div
            className="
            pointer-events-none absolute
            -right-10 -top-10
            h-28 w-28
            rounded-full
            bg-purple-200/30
            blur-3xl
            transition-all duration-300
            group-hover:bg-purple-300/40
            "
        />


        {/* Header */}
        <div className="
            relative
            flex
            items-center
            justify-between
            gap-3
        ">

            <div className="min-w-0">

            <p className="
                mb-1
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-purple-400
            ">
                Project
            </p>

            <h4 className="
                truncate
                text-lg
                font-bold
                text-gray-800
            ">
                {name}
            </h4>

            </div>


            {/* Project icon */}
            <div className="
            flex
            h-9 w-9
            shrink-0
            items-center justify-center
            rounded-full
            border border-purple-200
            bg-purple-50
            text-purple-600
            transition
            group-hover:bg-purple-100
            ">
            ✦
            </div>

        </div>


        {/* Notes */}
        <div className="relative mt-4">

            {showAll ? (

            <div
                onClick={() => setShowAll(false)}
                className="
                cursor-pointer
                rounded-xl
                border border-purple-100
                bg-purple-50/40
                p-3
                "
            >

                <p className="
                text-sm
                leading-6
                text-gray-700
                ">
                {notes || "No notes added."}
                </p>

                <button
                className="
                    mt-2
                    text-xs
                    font-medium
                    text-purple-500
                    hover:text-purple-700
                "
                >
                close
                </button>

            </div>

            ) : (

            <div
                onClick={() => setShowAll(true)}
                className="cursor-pointer"
            >

                <p className="
                text-sm
                leading-6
                text-gray-600
                ">
                {notes
                    ? notes.slice(0, 150) + (notes.length > 150 ? "..." : "")
                    : "No notes added."
                }
                </p>

                {notes && notes.length > 150 && (
                <button
                    className="
                    mt-1
                    text-xs
                    font-semibold
                    text-purple-500
                    hover:text-purple-700
                    "
                >
                    show more
                </button>
                )}

            </div>

            )}

        </div>


        {/* Outcome */}
        {outcome && (
            <div className="
            relative
            mt-4
            rounded-xl
            border border-purple-100
            bg-purple-50/40
            p-3
            ">

            <p className="
                mb-1
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-purple-400
            ">
                Outcome
            </p>

            <p className="
                text-sm
                leading-6
                text-gray-700
            ">
                {outcome}
            </p>

            </div>
        )}


        {/* Actions */}
        <div className="
            relative
            mt-5
            flex
            flex-wrap
            gap-2
        ">

            {/* Delete */}
            <button
            onClick={onDelete}
            className="
                rounded-lg
                border border-red-100
                bg-red-50
                px-3 py-2
                text-xs
                font-semibold
                text-red-600
                transition
                hover:bg-red-100
            "
            >
            Delete
            </button>


            {/* Clarify */}
            {/*<button
            // onClick={() => router.push(`/inbox/clarify/${id}`)}
            className="
                rounded-lg
                bg-purple-600
                px-4 py-2
                text-xs
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-purple-700
                hover:shadow-md
            "
            >
            Clarify
            </button>*/}


            {/* Actions */}
            <button
            onClick={() => router.push(`/projects/${id}/actions`)}
            className="
                rounded-lg
                border border-purple-200
                bg-purple-50
                px-4 py-2
                text-xs
                font-semibold
                text-purple-700
                transition
                hover:bg-purple-100
                hover:border-purple-300
            "
            >
            Actions →
            </button>

        </div>

        </div>





    </>)
}

export default ProjectCard;