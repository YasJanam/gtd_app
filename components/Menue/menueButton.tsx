import React from "react"

type Probs = {
    show?:boolean
    onClick:() => void
    icon:React.ReactElement
    label:string
}

const MenueButton = ({show=true,onClick,icon,label}:Probs) => {
    return (show && <>
          <button
            onClick={onClick}
            className="
            group
            flex
            flex-col
            items-center
            justify-center
            gap-1.5
            rounded-2xl
            px-3
            py-2.5
            text-white/100
            transition-all
            duration-200
            hover:bg-white/10
            hover:text-white
            md:w-full
            "
            
        >

            <div className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            transition
            group-hover:bg-purple-500/20
            ">
                {icon}
            </div>

            <span className="text-[10px] font-medium">
                {label}
            </span>

      </button>
    </>)
}



export default MenueButton;