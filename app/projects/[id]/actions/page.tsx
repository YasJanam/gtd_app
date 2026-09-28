
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


import Menue from "@/components/Menue/menue"
import ProjectMenue from "@/components/pages/projects/projectMenue";
import ActionsComp from "@/components/pages/projects/actions/actionsComp"
//import { Params } from "next/dist/server/request/params";

import { cookies } from "next/headers";


interface Params {
    params: Promise<{ id: string }>;
}


type Proj = {
    _id:string,
    name: string,
    notes:string,
    outcome:string
}


export default async function ProjectActionsPage({params}: Params) {
    const { id } = await params;

    const cookiStore = await cookies();
    const token = cookiStore.get('access_token')?.value;
    
    const project =  await fetch(`${API_BASE_URL}/projects/${id}`,{
        method:'GET',
        headers:{
        Authorization: `Bearer ${token}` ,
        'Content-Type': 'application/json',
        },
        cache:'no-store'
    }).then(res => res.json()).catch(err => console.log(err))



    return (<Menue>
        <ActionsComp name={project.name} notes={project.notes} id={project._id} />
    </Menue>)
}