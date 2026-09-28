'use client'

const API_BASE_URL = "http://localhost:3001";
 
import api from "@/lib/api";
import Image from "next/image"
import { Button, Label, TextInput, Toast } from "flowbite-react"
import { useState } from "react";
import { toast, Toaster } from "sonner";


const SignUpComponent = () => {
    const [username,setUsername] = useState('');
    const [pass,setPass] = useState('');


    /*const signUp = async() => {
        const res = await api.post('/users/sign-up',{
            username:username,
            password:pass
        })

        if(res.status>=200 && res.status<300) {
            toast.success('success')
        } else {
            toast.error('error')
        }
    }*/


    const signUp = async() => {
      await fetch(`${API_BASE_URL}/users/sign-up`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            username: username,
            password: pass
        })
      }).then(res => res.json()).catch(err => toast.error(err))
    }


    return (<div className="relative h-screen">
        <main className="flex justify-between p-10">
            <div>
                <Image
                src="/gtd_page.png"
                alt="gtd logo"
                fill
                priority
                />
            </div>

            <div className="backdrop-blur-lg p-5 rounded-xl w-[600px] space-y-5">
                <h1 className="flex justify-center text-black text-[30px] bold">Sign Up</h1>
                <div className="grid gap-3 grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-1">
                    <div className="m-2">
                        <label className="text-black">username</label>
                        {/*<TextInput type="text"  value={username} onChange={(e:any) => setUsername(e.target.value)}/>*/}
                        <input className="border-b-2 border-b-black w-full  h-10  focus:border-none text-black text-md"
                        value={username} onChange={(e:any) => setUsername(e.target.value)}
                        />
                    </div>


                    <div className="m-2">
                        <label className="text-black">password</label>
                        {/*<TextInput type="password" value={pass} onChange={(e:any) => setPass(e.target.value )} />*/}
                        <input type="password" className="border-b-2 border-b-black w-full  h-10 text-black text-md focus:border-none"
                        value={pass} onChange={(e:any) => setPass(e.target.value )}
                        />

                    </div>
  
                    
                </div>

                <div className="flex flex-col items-center gap-3 justify-center mt-6">
                    <Button color="gray" className="w-45" onClick={() => signUp()}>sign up</Button>
                    {/*<Button color="info" className="focus:border-none py-1">login</Button>*/}
                </div>


            </div>

        </main>

    </div>)
}


export default SignUpComponent