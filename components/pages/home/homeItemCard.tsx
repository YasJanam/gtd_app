import React from "react";

type Probs = {
    icon: React.ReactNode,
    icon_color?:string,
    count: number,
    name: string,
}

const HomeItemCard = ({icon,count,name}: Probs) => {
    return (<>

    <div
    className="
        group
        rounded-2xl
        border border-gray-200
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-purple-200
        hover:bg-purple-50/30
        hover:shadow-md
    "
    >

    <div className="
        flex
        items-start
        justify-between
        gap-3
    ">

        {/* Icon */}
        <div className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        bg-purple-100
        text-purple-600
        transition
        group-hover:bg-purple-200
        ">
        {icon}
        </div>


        {/* Count */}
        <p className="
        text-2xl
        font-bold
        tracking-tight
        text-gray-800
        ">
        {count}
        </p>

    </div>


    {/* Label */}
    <div className="mt-4">

        <span className="
        text-xs
        font-semibold
        uppercase
        tracking-wide
        text-gray-400
        ">
        {name}
        </span>

    </div>

    </div>


    </>)
}

export default HomeItemCard;