'use client'

import { useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


const Test = () => {
    const WP_USERNAME = "yas_janami";
    const WP_APP_PASSWORD = "tKCL d3g0 4QLr NueX rjVr rSrp";
    const url = 'https://ziresefr.org/wp-json/wp/v2/users';

    

    //const auth = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');
    const auth = btoa(`${WP_USERNAME}:${WP_APP_PASSWORD}`);

    const fetchWpUsers = async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/wpusers`,{
                method:'GET',
                headers:{
                    //Authorization: `Basic ${auth}`,
                    "Content-Type": "application/json",
                }
            });

            
        } catch {

        }
    }


    const fetchWcProducts = async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/ziresefr-connection/products`,{
                method:'GET',
                headers:{
                    //Authorization: `Basic ${auth}`,
                    "Content-Type": "application/json",
                }
            });

            
        } catch {

        }
    }


    

    
    const fetchLdlmsCourses = async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/ldlms-courses`,{
                method:'GET',
                headers:{
                    //Authorization: `Basic ${auth}`,
                    "Content-Type": "application/json",
                }
            });

            
        } catch {

        }
    }

    

    const fetchLdlmsLessons = async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/ziresefr-connection/ldlms-lessons`,{
                method:'GET',
                headers:{
                    //Authorization: `Basic ${auth}`,
                    "Content-Type": "application/json",
                }
            });

            
        } catch {

        }
    }



    const fetchPosts = async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/ziresefr-connection/posts`,{
                method:'GET',
                headers:{
                    //Authorization: `Basic ${auth}`,
                    "Content-Type": "application/json",
                }
            });

            
        } catch {

        }
    }

    


    useEffect(() => {
        fetchWpUsers();
        fetchWcProducts();
        fetchLdlmsCourses();
        fetchLdlmsLessons();
        fetchPosts();
    },[])


    return <></>
}

export default Test;