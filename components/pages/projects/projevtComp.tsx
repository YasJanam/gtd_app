
'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

import ProjectCard from "./projectCard";
//import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import DeleteModal from "@/components/commonComponents/deleteModal";
import { getCookie } from 'cookies-next';
import { Plus } from "flowbite-react-icons/outline";
import { title } from "process";



type InboxItemType = {
    _id:string
    name:string
    notes:string
    user: string,
    outcome:string,
}




const ProjectComp = () => {
    const token = getCookie('access_token');
    
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const [deleteItemId,setDeleteItemId] = useState('');
    const [projs,setProjs] = useState<InboxItemType[]>([]);
    
    const [name,setName] = useState("");
    const [notes,setNotes] = useState("");

    
    

    useEffect(() => {
        getMyProjs();
    },[])



    const getMyProjs = async() => {
        try{
            const res = await fetch(`${API_BASE_URL}/projects/user-projects`,{
              method:'GET',
              headers:{
                Authorization: `Bearer ${token}` ,
                'Content-Type': 'application/json',
              }
            })

            const resp = await res.json();
            setProjs(resp)
            
        }catch {
            console.log('fetching errors')
        }
    }








    return (<>

<div className="px-2 py-2">

  {/* Header */}
  <div className="
    flex flex-col sm:flex-row
    sm:items-center
    justify-between
    gap-4
    mb-8
  ">

    <div>
      <p className="text-sm font-medium text-purple-200 mb-1">
        GTD • Organize
      </p>

      <h1 className="
        text-4xl md:text-5xl
        font-bold
        tracking-tight
        text-white
      ">
        Projects
      </h1>

      <p className="mt-2 text-sm text-purple-100/70">
        Turn your ideas into projects and keep everything organized.
      </p>
    </div>

  </div>


  {/* Create Project */}
  <div className="
    mb-7
    rounded-3xl
    border border-white/10
    bg-white/10
    p-5
    shadow-xl
    shadow-purple-950/10
    backdrop-blur-md
  ">

    <div className="
      mb-4
      flex items-center gap-3
    ">

      <div className="
        flex h-10 w-10
        items-center justify-center
        rounded-xl
        bg-purple-500/20
        text-purple-200
      ">
        <Plus size={20} />
      </div>

      <div>
        <h2 className="font-semibold text-white">
          New Project
        </h2>

        <p className="text-xs text-purple-100/60">
          Start a new project and define what you want to achieve.
        </p>
      </div>

    </div>


    <div className="
      flex flex-col
      md:flex-row
      gap-3
    ">

      {/* Name */}
      <input
        className="
          h-11
          w-full
          md:w-1/3
          rounded-xl
          border border-white/10
          bg-white/10
          px-4
          text-sm
          text-white
          outline-none
          placeholder:text-purple-100/40
          transition
          focus:border-purple-400/60
          focus:bg-white/15
          focus:ring-4
          focus:ring-purple-500/10
        "
        placeholder="Project name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />


      {/* Notes */}
      <textarea
        className="
          min-h-[44px]
          h-11
          w-full
          flex-1
          resize-none
          rounded-xl
          border border-white/10
          bg-white/10
          px-4
          py-3
          text-sm
          leading-5
          text-white
          outline-none
          placeholder:text-purple-100/40
          transition
          focus:border-purple-400/60
          focus:bg-white/15
          focus:ring-4
          focus:ring-purple-500/10
        "
        placeholder="What is this project about?"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />


      {/* Add button */}
      <button
        onClick={() => {}}
        className="
          flex
          h-11
          shrink-0
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-white
          px-5
          font-semibold
          text-purple-700
          shadow-lg
          shadow-purple-950/20
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:bg-purple-50
          hover:shadow-xl
        "
      >
        <Plus size={17} />
        Add
      </button>

    </div>

  </div>


  {/* Projects stats */}
  <div className="
    mb-7
    flex flex-wrap
    items-center
    gap-3
  ">

    <div className="
      rounded-xl
      border border-white/10
      bg-white/10
      px-4 py-2
      backdrop-blur-md
    ">

      <span className="text-xs text-purple-200">
        Projects
      </span>

      <span className="ml-2 font-bold text-white">
        {projs?.length || 0}
      </span>

    </div>


    <div className="
      h-px
      flex-1
      bg-gradient-to-r
      from-white/20
      to-transparent
    "/>

  </div>


  {/* Project Cards */}
  <div className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-5
    pb-10
  ">

    {projs && projs.length > 0 ? (

      projs.map((p) => (

        <ProjectCard
          key={p._id}
          id={p._id}
          name={p.name}
          notes={p.notes}
          outcome={p.outcome}
          onDelete={() => {
            setDeleteItemId(p._id)
            setShowDeleteModal(true)
          }}
        />

      ))

    ) : (

      /* Empty state */
      <div className="
        col-span-full
        flex
        min-h-[300px]
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-white/20
        bg-white/5
        text-center
        backdrop-blur-sm
      ">

        <div className="
          mb-4
          flex h-16 w-16
          items-center justify-center
          rounded-2xl
          bg-purple-500/20
          text-3xl
        ">
          ✦
        </div>


        <h3 className="text-lg font-semibold text-white">
          No projects yet
        </h3>


        <p className="
          mt-2
          max-w-sm
          text-sm
          text-purple-100/60
        ">
          Create your first project and start organizing your work.
        </p>

      </div>

    )}

  </div>


  {/* Delete Modal */}
  <DeleteModal
    show={showDeleteModal}
    onClose={() => setShowDeleteModal(false)}
    url={`/inbox/items/${deleteItemId}`}
    onSuccess={getMyProjs}
  />

</div>


    </>)
}


export default ProjectComp