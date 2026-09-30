import { ArrowLeftIcon } from "flowbite-react"
import { ArrowRight } from "flowbite-react-icons/outline"
import React from "react"

type Probs = {
    show?:boolean
    onLeft:() => void
    onRight:() => void
   
}

const ForwardBackwardButton = ({show=true,onLeft,onRight}:Probs) => {
    return (show && <div className="flex">
          <button
            //onClick={onLeft}
            className="
            
            group
            flex
            flex-col
            items-center
            justify-center
            gap-1.5
            rounded-2xl
            px-1
            py-2.5
            text-white/100
            transition-all
            duration-200
            
            
            md:w-full
            "
            
        >
            <div className="flex">
                <div 
                onClick={onLeft}
                className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                transition
                hover:bg-purple-500/20
                hover:text-white
                ">
                    <ArrowLeftIcon />
                </div>

                <div 
                onClick={onRight}
                className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                transition
                hover:bg-purple-500/20
                hover:text-white
                ">
                    <ArrowRight />
                </div>
            </div>

            <span className="text-[10px] font-medium">
                Browse
            </span>

      </button>

    </div>)
}



export default ForwardBackwardButton;