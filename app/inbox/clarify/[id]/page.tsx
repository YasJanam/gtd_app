
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

import GtdProcess from "@/components/pages/gtdProcess/gtdProcessComp";
import Image from "next/image";

import { cookies } from "next/headers";


interface Params {
    params: Promise<{ id: string }>;
}

export default async function GtdPlaning({params}:Params) {
    const {id} = await params;

    const cookiStore = await cookies();
    const token = cookiStore.get('access_token')?.value;
    
    const project =  await fetch(`${API_BASE_URL}/inbox/items/${id}`,{
        method:'GET',
        headers:{
        Authorization: `Bearer ${token}` ,
        'Content-Type': 'application/json',
        },
        cache:'no-store'
    }).then(res => res.json()).catch(err => console.log(err))


    return (<>
    <div>
        <Image
        src="/nightSky.webp"
        alt="gtd planing"
        fill
        priority
        />
    </div>

    <GtdProcess  id={id} itemTitle={project.title} itemDescription={project.description}/>
    </>)
}