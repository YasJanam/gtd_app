'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import Image from "next/image";

import { ArrowRight, CalendarWeek, GridPlus, Play, Plus } from "flowbite-react-icons/outline";
import { Home } from "flowbite-react-icons/outline";
import { Inbox } from "flowbite-react-icons/outline";
import { Folder } from "flowbite-react-icons/outline";
import MenueButton from "./menueButton";
import { Modal, ModalBody, Popover } from "flowbite-react";
import { CalendarIcon } from "flowbite-react";
import { Book } from "flowbite-react-icons/outline";
import { Clock } from "flowbite-react-icons/outline";

import { useAppStore } from "../globalStore/providers/app-store-provider";
import ForwardBackwardButton from "./LeftArrowButton";

const Menue = ({children}:{children?:React.ReactNode}) => {
    const menuePage = useAppStore((s) => s.menuePage);
    const setMenuePage = useAppStore((s) => s.setMenuePage);

    const router = useRouter();
    const [showMore,setshowMore] = useState(false);
    //const [menuePage,setMenuePage] = useState(0);
    const ALL_ITEMS = 9;
    const PAGE_ITEMS_NUM = 4;
    const PAGE_NUM = Math.ceil(ALL_ITEMS / PAGE_ITEMS_NUM) ;


    const showMoreAction = () => {
      
      if(menuePage < PAGE_NUM -1) {
        setMenuePage(menuePage+1);
      }
      else {
        setMenuePage(0);
      }
    }
    

    return (<>
  
<div className="min-h-screen">

  {/* Background */}
  <div className="fixed inset-0 -z-20">

    <Image
      src="/nightSky2.webp"
      alt="GTD background"
      fill
      priority
      className="object-cover"
    />

    {/* Dark overlay */}
    <div className="
      absolute
      inset-0
      bg-[#160b2b]/40
    " />

  </div>


  <div className="flex min-h-screen flex-col md:flex-row">

    {/* ================================================== */}
    {/* Navigation */}
    {/* ================================================== */}

    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50

        flex
        h-[72px]
        items-center
        justify-around

        border-t
        border-white/10

        bg-[#160b2b]/95

        px-3
        shadow-[0_-8px_30px_rgba(0,0,0,0.25)]

        md:sticky
        md:top-0
        md:h-screen
        md:w-[92px]
        md:flex-col
        md:justify-center

        md:border-t-0
        md:border-r
        md:border-white/10

        md:bg-[#160b2b]/90
        md:px-2
        md:py-6

        backdrop-blur-md
      "
    >

      {/* Logo / Brand */}
      <div className="
        hidden
        md:flex
        md:mb-8
        h-11
        w-11
        items-center
        justify-center
        rounded-2xl
        bg-purple-600
        text-xl
        font-bold
        text-white
        shadow-lg
        shadow-purple-950/40
      ">
        ✦
      </div>


      {/* Home */}
     {/* <button
        onClick={() => router.push('/home')}
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
          text-white/60
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
          <Home size={20} />
        </div>

        <span className="text-[10px] font-medium">
          Home
        </span>

      </button>*/}


      <MenueButton
      show={menuePage===0}
      onClick={() => router.push('/home')}
      icon={<Home size={20} />}
      label="Home"
      />


      {/* Inbox */}
      <MenueButton

        show={menuePage===0}
        onClick={() => router.push('/inbox')}
        icon={<Inbox size={20} />}
        label="Inbox"
      />


      
     

      {/* Next */}
      {/*<MenueButton
        onClick={() => router.push('/next')}
        icon={<Play size={20} />}
        label="Next"
      />*/}


      


      {/* Projects */}
      <MenueButton
      show={menuePage===0}

        onClick={() => router.push('/projects')}
        icon={<Folder size={20} />}
        label="Projects"
      />

      



        <MenueButton
          show={menuePage===1}

          onClick={() => router.push('/next-actions')}
          icon={<Play size={20} />}
          label="Next"
        />

        <MenueButton
          show={menuePage===1}
          onClick={() => router.push('/calendar-items')}
          icon={<CalendarWeek size={20} />}
          label="Calendar"
        />

        <MenueButton
          show={menuePage===1}
          onClick={() => router.push('/reference')}
          icon={<Book size={20} />}
          label="Reference"
        />

        <MenueButton
          show={menuePage===2}
          onClick={() => router.push('/someday-items')}
          icon={<Clock size={20} />}
          label="Someday / Maybe"
        />


        {/* more  */}
      
      <MenueButton
      show={menuePage===0}
        onClick={() => showMoreAction()}
        icon={<GridPlus size={20} />}
        label={"more"}
      /> 
      
      
      <ForwardBackwardButton
        show={menuePage!==0}
        onLeft={() => setMenuePage(menuePage-1)}
        onRight={() => showMoreAction()}

      /> 

    </nav>


    {/* ================================================== */}
    {/* Main Content */}
    {/* ================================================== */}

    <main
      className="
        w-full
        min-w-0
        pb-24
        md:pb-0
        md:p-5
        lg:p-7
      "
    >

      <div className="
        mx-auto
        w-full
        max-w-[1500px]
        p-1
      ">

        {children}

      </div>

    </main>

  </div>

{/*<Modal
  show={openMoreModal}
  onClose={() => setOpenMoreModal(false)}
  className="!flex !items-center !justify-center"
  size="xs"
>

  <ModalBody className="!p-0">

    <div
      className="
       
        max-w-[calc(100vw-32px)]
        overflow-hidden
        rounded-2xl
        border
        border-purple-200/30
        bg-[#21113d]
        p-3
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
      "
    >

   
      <div
        className="
          mb-3
          flex
          items-center
          justify-between
          px-2
          pt-1
        "
      >

        <div>
          <p className="
            text-sm
            font-semibold
            text-white
          ">
            More
          </p>

          <p className="
            mt-0.5
            text-[11px]
            text-purple-200/60
          ">
            Quick navigation
          </p>
        </div>


        <button
          onClick={() => setOpenMoreModal(false)}
          className="
            flex
            h-7 w-7
            items-center
            justify-center
            rounded-lg
            text-purple-200/60
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          ✕
        </button>

      </div>


    
      <div className="grid grid-cols-2 gap-2">

        <MenueButton
          onClick={() => router.push('/next')}
          icon={<Play size={20} />}
          label="Next"
        />

        <MenueButton
          onClick={() => router.push('/calendar')}
          icon={<CalendarWeek size={20} />}
          label="Calendar"
        />

        <MenueButton
          onClick={() => router.push('/reference')}
          icon={<Book size={20} />}
          label="Reference"
        />

        <MenueButton
          onClick={() => router.push('/mabe')}
          icon={<Clock size={20} />}
          label="Someday / Maybe"
        />

      </div>

    </div>

  </ModalBody>

</Modal>*/}
</div>


    </>)

    /*return (<>
    <div >
        <div className="
            grid 
            grid-cols-4 
            md:grid-cols-1 
            lg:grid-cols-1 
            xl:grid-cols-1 
            
            items-center 
            justify-center 
            
            h-25 
            md:h-screen 
            lg:h-screen 
            xl:h-screen 
            
            w-full 
            md:w-24 
            lg:w-24 
            xl:w-24 
            
            p-4 
            shadow 
            
            xs:fixed 
            xs:bottom-0     

            sm:fixed 
            sm:bottom-0 
            ">
                
            <div className="p-1">
                <span className="hover:text-yellow-500 font-bold">Home</span>
            </div>

            <div className="p-1">
                <span className="hover:text-yellow-500 font-bold">Inbox</span>
            </div>

            <div className="p-1">
                <span className="hover:text-yellow-500 font-bold">Next</span>
            </div>

            <div className="p-1">
                <span className="hover:text-yellow-500 font-bold">Projects</span>
            </div>
        </div>

        <div className="w-full  md:w-[75%] lg:ml-[20%] xl:w-[75%] ">{children}</div>
    </div>
    </>)*/
}


export default Menue;