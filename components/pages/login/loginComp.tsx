'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

import Image from "next/image"
import { Button, Label, TextInput } from "flowbite-react"
import { useState } from "react"

import SignUpComponent from "../sign-up/signUpComp"
import Link from "next/link";
import { toast, Toaster } from "sonner"
import { useRouter } from "next/navigation"

import { setCookie } from 'cookies-next';



const LoginComponent = () => {
    const router = useRouter()
    const [username,setUsername] = useState('');
    const [pass,setPass] = useState('');

    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);


      const handleSubmit = async(e:any) => {
        e.preventDefault();

        if (!username || !pass){
            toast.error('لطفاً همه فیلدها را پر کنید');
            return;
        }

        setLoading(true);
        setError('');

        try{
            const tokenResponse = await fetch(`${API_BASE_URL}/auth/login`,{
              method:'POST',
              headers:{
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({
                username: username,
                password:pass
            })});

            const res = await tokenResponse.json();
            const {token,timezone,uid} = res.data;


            
            localStorage.setItem('access_token',token);

            setCookie('access_token', token, {
                //httpOnly: true,    
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'lax',  
                maxAge: 60 * 60 * 24, 
                path: '/',
            });

            localStorage.setItem('user_id',uid);
            localStorage.setItem('timezone',timezone);
            
            
            if(token){
                //alert(token)
                 router.push('/home');
            }else{
                toast.error('Unauthorized');
            }
           


        }catch(err){
            console.error('login error : ', err);

        }finally {
            setLoading(false);
        }
    };


    return (<div>
        <main className="flex justify-between p-10">
            <div>
                <Image
                src="/gtd_page.webp"
                alt="gtd logo"
                fill
                
                priority
                />
            </div>

            <div className="backdrop-blur-lg p-5 rounded-xl w-[600px] space-y-5">
                <h1 className="flex justify-center text-black text-[30px] bold">Login</h1>
                <div className="grid gap-3 grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-1">
                    <div className="m-2">
                        <label className="text-black">username</label>
                        {/*<TextInput type="text"  value={username} onChange={(e:any) => setUsername(e.target.value)}/>*/}
                        <input className="border-b-2 border-b-black w-full  h-10 text-black text-md focus:border-none"
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
                    <Button color="gray" className="w-45" onClick={handleSubmit}>login</Button>
                    <Button color="info" className="focus:border-none py-1" href="/sign-up">sgin up</Button>
                </div>


            </div>

        </main>

        <Toaster />
    </div>)
}


export default LoginComponent