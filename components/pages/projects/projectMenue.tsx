'use client'

import { useRouter } from "next/navigation";
import React from "react";



const ProjectMenue = ({children,name}:{children?:React.ReactNode,name:string}) => {
    const router = useRouter();


    return (<>
    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row ">
        
        <div className=" 
            sticky top-0 z-50 
            bg-purple-300
            grid 
            grid-cols-4 
            md:grid-cols-1 
            lg:grid-cols-1 
            xl:grid-cols-1 
            
            items-center 
            justify-center
            
            h-24 
            md:h-screen 
            lg:h-screen 
            xl:h-screen 
            
            w-full 
            md:w-24 
            lg:w-24 
            xl:w-24 
            
            p-4 
            shadow 
            
            ">
            <h1 className="font-bold text-[25]">name</h1>
            <div className="p-1" onClick={() => router.push('/home')}>
                <button className="hover:text-yellow-500 font-bold">next actions</button>
            </div>
            
            <div className="p-1" onClick={() => router.push('/home')}>
                <button className="hover:text-yellow-500 font-bold">add action</button>
            </div>

            <div className="p-1" onClick={() => router.push('/inbox')}>
                <button className="hover:text-yellow-500 font-bold">ai</button>
            </div>

        </div>

        <div className="w-full p-3 pt-6">{children}</div>

    </div>
    </>)

   
}


export default ProjectMenue;