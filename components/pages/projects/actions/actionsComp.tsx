'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';
import { Button } from "flowbite-react";
import { toast } from "sonner";
import { Plus } from "flowbite-react-icons/outline";
import { title } from "process";
import { Spinner } from "flowbite-react";


type GeneratedActionType = {
    title: string,
    description: string,
    order: number,
    estimatedMinutes: number,
}

type Probs = { 

    id:string,
    name:string
    notes:string
}


const ActionsComp = ({id,name,notes}:Probs) => {
    const router = useRouter();
    const token = getCookie('access_token');
    
    const [genaretedActions,setGenartedActions] = useState<GeneratedActionType[]>()
    const [aiGenerateLoading,setAiGenerateLoading] = useState(false);
    const [stage,setStage] = useState('NextActions');

    const [projectActions,setProjectActions] = useState<GeneratedActionType[]>();


    const [newActionForm,setNewActionForm] = useState({
        title: '',
        description: '',
        order: 0,
        estimatedMinutes : 0
    });

    /*const [aiLoading,setAiLoading] = useState(false);
    const [addLoading,setAddLoading] = useState(false);
    const [fetchLoading,setFetchLoading] = useState(false);*/



    useEffect(() => {
        getProjectActions()
    },[stage])



    const generateNextActions = async() => {
        try{
            //setAddLoading(true);
            setAiGenerateLoading(true);
            const res = await fetch(`${API_BASE_URL}/ai/generate-actions`,{
              method:'POST',
              headers:{
                Authorization: `Bearer ${token}` ,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: name,
                description: notes
              })
            })

            const resp = await res.json();
            //alert(resp.actions.length)
            setGenartedActions(resp.actions)
            
        }catch {
            console.log('fetching errors')
        } finally {
            setAiGenerateLoading(false);
        }
    }


    const createProjectActions = async() => {
        try{
            const res = await fetch(`${API_BASE_URL}/inbox/project/${id}/create-actions`,{
              method:'POST',
              headers:{
                Authorization: `Bearer ${token}` ,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                actions: genaretedActions
              })
            })

            if(res.ok) {
                setStage('NextActions');
            }
           
            
        }catch {
            console.log('fetching errors')
        }
    }



    const getProjectActions = async() => {
        try{
            const res = await fetch(`${API_BASE_URL}/inbox/project/items?project=${id}`,{
              method:'GET',
              headers:{
                Authorization: `Bearer ${token}` ,
                'Content-Type': 'application/json',
              }, 
            })

            const resp = await res.json();

            setProjectActions(resp);
            
        }catch {
            console.log('fetching errors')
        }
    }



    const AddProjectAction = async() => {
        try{
            const res = await fetch(`${API_BASE_URL}/inbox/project/${id}/add-action`,{
              method:'POST',
              headers:{
                Authorization: `Bearer ${token}` ,
                'Content-Type': 'application/json',
              }, 
              body:JSON.stringify({
                ...newActionForm,
                user:localStorage.getItem('user_id')
              })
            }) 

            const resp = await res.json();

            if(resp.ok) {
                getProjectActions();
            }
            //setProjectActions(resp);
            
        }catch {
            console.log('fetching errors')
        } 
    }

   


    return (

<div className="px-2 py-2">

  {/* Header */}
  <div className="
    mb-7
    flex
    flex-col
    gap-5
  ">

    {/* Project title */}
    <div>
      <p className="
        mb-1
        text-sm
        font-medium
        text-purple-500
      ">
        GTD • Project
      </p>

      <h1 className="
        text-3xl
        md:text-4xl
        font-bold
        tracking-tight
        text-white
      ">
        {name}
      </h1>

      <p className="
        mt-2
        text-sm
        text-gray-400
      ">
        Manage the actions and next steps for this project.
      </p>
    </div>


    {/* Navigation */}
    <div className="
      sticky
      top-4
      z-50
      flex
      w-fit
      max-w-full
      flex-wrap
      items-center
      gap-1
      rounded-2xl
      border border-gray-200
      bg-white
      p-1.5
      shadow-md
    ">

      {/* Next Actions */}
      <button
        onClick={() => setStage('NextActions')}
        className={`
          rounded-xl
          px-4
          py-2
          text-sm
          font-semibold
          transition-all
          
          ${
            stage === 'NextActions'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-gray-500 hover:bg-purple-50 hover:text-purple-700'
          }
        `}
      >
        Next Actions
      </button>


      {/* Add Action */}
      <button
        onClick={() => setStage('AddAction')}
        className={`
          rounded-xl
          px-4
          py-2
          text-sm
          font-semibold
          transition-all
          ${
            stage === 'AddAction'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-gray-500 hover:bg-purple-50 hover:text-purple-700'
          }
        `}
      >
        + Add Action
      </button>


      {/* AI */}
      <button
        onClick={() => setStage('AI')}
        className={`
          rounded-xl
          px-4
          py-2
          text-sm
          font-semibold
          transition-all
          ${
            stage === 'AI'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-gray-500 hover:bg-purple-50 hover:text-purple-700'
          }
        `}
      >
        ✦ AI
      </button>

    </div>

  </div>


  {/* ====================================================== */}
  {/* NEXT ACTIONS */}
  {/* ====================================================== */}

  {stage === 'NextActions' && (

    <div>

      {/* Section header */}
      <div className="
        mb-5
        flex
        items-center
        justify-between
      ">

        <div>
          <h2 className="
            text-xl
            font-bold
            text-gray-300
          ">
            Next Actions
          </h2>

          <p className="
            mt-1
            text-sm
            text-gray-400
          ">
            The actions currently planned for this project.
          </p>
        </div>


        <div className="
          rounded-xl
          bg-purple-50
          px-3
          py-2
          text-sm
          font-semibold
          text-purple-600
        ">
          {projectActions?.length || 0} actions
        </div>

      </div>


      {/* Actions */}
      <div className="space-y-3">

        {projectActions && projectActions.length > 0 ? (

          projectActions.map((act, index) => (

            <div
              key={index}
              className="
                rounded-2xl
                border border-gray-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:border-purple-200
                hover:shadow-md
              "
            >

              <div className="
                flex
                flex-col
                md:flex-row
                md:items-start
                gap-4
              ">

                {/* Order */}
                <div className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-purple-100
                  text-sm
                  font-bold
                  text-purple-600
                ">
                  {act.order}
                </div>


                {/* Content */}
                <div className="flex-1 min-w-0">

                  <h3 className="
                    text-base
                    font-bold
                    text-gray-800
                  ">
                    {act.title}
                  </h3>

                  <p className="
                    mt-1
                    text-sm
                    leading-6
                    text-gray-500
                  ">
                    {act.description || 'No description provided.'}
                  </p>

                </div>


                {/* Estimated time */}
                <div className="
                  shrink-0
                  rounded-xl
                  border border-gray-100
                  bg-gray-50
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-gray-500
                ">
                  ⏱ {act.estimatedMinutes} min
                </div>

              </div>

            </div>

          ))

        ) : (

          /* Empty state */
          <div className="
            flex
            min-h-[280px]
            flex-col
            items-center
            justify-center
            rounded-3xl
            border
            border-dashed
            border-gray-300
            bg-white
            text-center
          ">

            <div className="
              mb-4
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-purple-100
              text-2xl
              text-purple-600
            ">
              ✓
            </div>

            <h3 className="
              text-lg
              font-semibold
              text-gray-800
            ">
              No actions yet
            </h3>

            <p className="
              mt-2
              max-w-sm
              text-sm
              text-gray-400
            ">
              Add your first action or let AI generate some next steps.
            </p>

            <button
              onClick={() => setStage('AddAction')}
              className="
                mt-5
                rounded-xl
                bg-purple-600
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-purple-700
              "
            >
              + Add Action
            </button>

          </div>

        )}

      </div>

    </div>

  )}


  {/* ====================================================== */}
  {/* ADD ACTION */}
  {/* ====================================================== */}

  {stage === 'AddAction' && (

    <div className="
      rounded-3xl
      border border-gray-200
      bg-white
      p-5
      md:p-6
      shadow-sm
    ">

      {/* Form header */}
      <div className="mb-6">

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-purple-100
            text-purple-600
          ">
            <Plus size={20} />
          </div>

          <div>

            <h2 className="
              font-bold
              text-gray-800
            ">
              Add Action
            </h2>

            <p className="
              text-xs
              text-gray-400
            ">
              Define the next concrete step for this project.
            </p>

          </div>

        </div>

      </div>


      {/* Form */}
      <div className="space-y-5">

        {/* Title */}
        <div>

          <label className="
            mb-2
            block
            text-sm
            font-semibold
            text-gray-700
          ">
            Title
          </label>

          <input
            className="
              w-full
              rounded-xl
              border border-gray-200
              bg-gray-50
              px-4
              py-3
              text-sm
              text-gray-800
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-purple-400
              focus:bg-white
              focus:ring-4
              focus:ring-purple-100
            "
            placeholder="What needs to be done?"
            value={newActionForm.title}
            onChange={(e) =>
              setNewActionForm(prev => ({
                ...prev,
                title: e.target.value
              }))
            }
            required
          />

        </div>


        {/* Order + Estimated time */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-4
        ">

          {/* Order */}
          <div>

            <label className="
              mb-2
              block
              text-sm
              font-semibold
              text-gray-700
            ">
              Order
            </label>

            <input
              type="number"
              className="
                w-full
                rounded-xl
                border border-gray-200
                bg-gray-50
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-purple-400
                focus:bg-white
                focus:ring-4
                focus:ring-purple-100
              "
              placeholder="1"
              value={newActionForm.order}
              onChange={(e) =>
                setNewActionForm(prev => ({
                  ...prev,
                  order: Number(e.target.value)
                }))
              }
            />

          </div>


          {/* Estimated minutes */}
          <div>

            <label className="
              mb-2
              block
              text-sm
              font-semibold
              text-gray-700
            ">
              Estimated time
            </label>

            <div className="relative">

              <input
                type="number"
                className="
                  w-full
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  px-4
                  py-3
                  pr-14
                  text-sm
                  outline-none
                  transition
                  focus:border-purple-400
                  focus:bg-white
                  focus:ring-4
                  focus:ring-purple-100
                "
                placeholder="30"
                value={newActionForm.estimatedMinutes}
                onChange={(e) =>
                  setNewActionForm(prev => ({
                    ...prev,
                    estimatedMinutes: Number(e.target.value)
                  }))
                }
              />

              <span className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-xs
                text-gray-400
              ">
                min
              </span>

            </div>

          </div>

        </div>


        {/* Description */}
        <div>

          <label className="
            mb-2
            block
            text-sm
            font-semibold
            text-gray-700
          ">
            Description
          </label>

          <textarea
            className="
              min-h-[130px]
              w-full
              resize-none
              rounded-xl
              border border-gray-200
              bg-gray-50
              px-4
              py-3
              text-sm
              leading-6
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-purple-400
              focus:bg-white
              focus:ring-4
              focus:ring-purple-100
            "
            placeholder="Add some details about this action..."
            value={newActionForm.description}
            onChange={(e) =>
              setNewActionForm(prev => ({
                ...prev,
                description: e.target.value
              }))
            }
          />

        </div>


        {/* Footer */}
        <div className="
          flex
          justify-end
          gap-2
          border-t
          border-gray-100
          pt-5
        ">

          <button
            onClick={() => setStage('NextActions')}
            className="
              rounded-xl
              px-4
              py-2
              text-sm
              font-medium
              text-gray-500
              transition
              hover:bg-gray-100
            "
          >
            Cancel
          </button>


          <button
            onClick={() => AddProjectAction()}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-purple-600
              px-5
              py-2
              text-sm
              font-semibold
              text-white
              shadow-md
              shadow-purple-200
              transition
              hover:bg-purple-700
              hover:shadow-lg
            "
          >
            <Plus size={16} />
            Add Action
          </button>

        </div>

      </div>

    </div>

  )}


  {/* ====================================================== */}
  {/* AI */}
  {/* ====================================================== */}

  {stage === 'AI' && (

    <div className="
      rounded-3xl
      border border-gray-200
      bg-white
      p-5
      md:p-6
      shadow-sm
    ">

      {/* AI Header */}
      <div className="
        mb-6
        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-4
      ">

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-purple-100
            text-purple-600
          ">
            ✦
          </div>

          <div>

            <h2 className="
              font-bold
              text-gray-800
            ">
              AI Suggested Actions
            </h2>

            <p className="
              text-xs
              text-gray-400
            ">
              Generate possible next actions for this project.
            </p>

          </div>

        </div>


        <Button
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-purple-600
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-md
            shadow-purple-200
            transition
            hover:bg-purple-700
            hover:shadow-lg
          "
          onClick={generateNextActions}
          disabled={aiGenerateLoading}
        >
          {aiGenerateLoading?'generating ...':'✦ Generate Actions'}

        </Button>

      </div>


      {/* Generated actions */}
      {genaretedActions && genaretedActions.length > 0 ? (

        <div className="space-y-3">

          {genaretedActions.map((act, index) => (

            <div
              key={index}
              className="
                rounded-2xl
                border border-gray-200
                bg-gray-50
                p-5
                transition
                hover:border-purple-200
                hover:bg-purple-50/30
              "
            >

              <div className="
                flex
                flex-col
                md:flex-row
                gap-4
              ">

                {/* Number */}
                <div className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-purple-100
                  text-sm
                  font-bold
                  text-purple-600
                ">
                  {act.order}
                </div>


                {/* Content */}
                <div className="flex-1">

                  <h3 className="
                    font-bold
                    text-gray-800
                  ">
                    {act.title}
                  </h3>

                  <p className="
                    mt-1
                    text-sm
                    leading-6
                    text-gray-500
                  ">
                    {act.description}
                  </p>

                </div>


                {/* Time */}
                <div className="
                  h-fit
                  shrink-0
                  rounded-xl
                  bg-white
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-gray-500
                  shadow-sm
                ">
                  ⏱ {act.estimatedMinutes} min
                </div>

              </div>

            </div>

          ))}


          {/* Accept */}
          <div className="
            flex
            justify-end
            border-t
            border-gray-100
            pt-5
          ">

            <Button
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-purple-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-md
                shadow-purple-200
                transition
                hover:bg-purple-700
                hover:shadow-lg
              "
              onClick={createProjectActions}
            >
              ✓ Accept Actions
            </Button>

          </div>

        </div>

      ) : (

        /* AI empty state */
        <div className="
          flex
          min-h-[240px]
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-gray-300
          bg-gray-50
          text-center
        ">

          <div className="
            mb-4
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-purple-100
            text-2xl
            text-purple-600
          ">
            ✦
          </div>

          <h3 className="
            text-lg
            font-semibold
            text-gray-800
          ">
            No suggestions yet
          </h3>

          <p className="
            mt-2
            max-w-sm
            text-sm
            text-gray-400
          ">
            Let AI analyze your project and suggest practical next actions.
          </p>

        </div>

      )}

    </div>

  )}

</div>


    // <div>
    //     {/*<Button className=" p-2 rounded" onClick={generateNextActions}>Click For AI</Button>*/}
        
    //     <div className="sticky xs:top-30 sm:top-30 md:top-10 lg:top-10 xl:top-10 z-50  rounded flex gap-10 text-gray-800 justify-center">
    //         <h2 className="text-[25px] font-bold ">{name}</h2>
    //         <button className="hover:text-yellow-500 hover:border-b-2 hover:border-b-yellow-600" onClick={() => setStage('NextActions')}>next actions</button>
    //         <button className="hover:text-yellow-500 hover:border-b-2 hover:border-b-yellow-600" onClick={() => setStage('AddAction')}>add action</button>
    //         <button className="hover:text-yellow-500 hover:border-b-2 hover:border-b-yellow-600" onClick={() => setStage('AI')}>ai</button>
    //     </div>



    //     {stage === 'NextActions' && 
    //     <div className="p-2 m-2 space-y-5">
    //         {projectActions && projectActions.length>0 && projectActions.map((act,index) => (
    //             <div key={index}  className="shadow p-3 rounded space-y-2 border-l-2 border-l-orange-500">
    //                 <p>title: {act.title}</p>
    //                 <p>description: {act.description}</p>
    //                 <p>order: {act.order}</p>
    //                 <p>estimatedMinutes: {act.estimatedMinutes}</p>
    //             </div>
    //         )) }
    //     </div>}


    //     {stage==='AddAction' && 
    //     <div className="p-2 m-2 space-y-5">
    //         <div className="gap-3 w-full mt-1 space-y-3">
    //             <div className="space-y-4 w-full flex flex-col">
    //                 <label className="text-gray-500">title</label>
    //                 <input className="rounded-lg border-2 border-purple-700 w-full h-8 p-3" placeholder="title" value={newActionForm.title} onChange={(e) => setNewActionForm(prev => ({...prev,title:e.target.value}))} required/>
    //                 <label className="text-gray-500 mr-3">order</label>
                    
    //                 <input type="number"  className="rounded-lg border-2 border-purple-700  h-8 p-3 mr-3" placeholder="name" value={newActionForm.order} onChange={(e) => setNewActionForm(prev => ({...prev,order:Number(e.target.value)}))}/>
    //                 <label className="text-gray-500 mr-3">estimatedMinutes</label>
                    
    //                 <input type="number" className="rounded-lg border-2 border-purple-700 h-8 p-3" placeholder="name" value={newActionForm.estimatedMinutes} onChange={(e) => setNewActionForm(prev => ({...prev,estimatedMinutes:Number(e.target.value)}))}/>
    //                 <textarea className="rounded-lg border-1 border-purple-900 w-full h-15 p-3" placeholder="notes ..." value={newActionForm.description} onChange={(e) => setNewActionForm(prev => ({...prev,description:e.target.value}))}/>

    //             </div>

    //             <div>
    //                 <button className="bg-purple-600 text-white rounded-sm p-[2px] hover:bg-purple-700 w-full flex justify-center"
    //                 onClick={() => AddProjectAction()}
    //                 ><Plus/> Add</button>
    //             </div>

    //         </div>
    //     </div>}



    //     {stage === 'AI' &&
    //     <div className="p-2 m-2 space-y-5">
    //         <Button className=" p-2 rounded" onClick={generateNextActions} 
    //         >Generate actions</Button>
    //         {genaretedActions && genaretedActions.length>0 && genaretedActions.map((act,index) => (
    //             <div key={index}  className="shadow p-3 rounded space-y-2 border-l-2 border-l-orange-500 ">
    //                 <p>title: {act.title}</p>
    //                 <p>description: {act.description}</p>
    //                 <p>order: {act.order}</p>
    //                 <p>estimatedMinutes: {act.estimatedMinutes}</p>
    //             </div>
    //         )) }

    //         {genaretedActions && genaretedActions.length>0 && <div className="rtl"><Button className=" p-2 rounded" 
    //         onClick={createProjectActions}
    //         >Accept</Button></div>}

    //     </div>}


       
    // </div>
    )
}

export default ActionsComp;