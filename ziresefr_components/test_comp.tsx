'use client'

import { Button } from "flowbite-react";
import { useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_ZIRESEFR;


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
            const response = await fetch(`${API_BASE_URL}/ziresefr-products/products`,{
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
            const response = await fetch(`${API_BASE_URL}/ziresefr-courses/ldlms-courses`,{
                method:'GET',
                headers:{
                    //Authorization: `Basic ${auth}`,
                    "Content-Type": "application/json",
                }
            });

            
        } catch {

        }
    }


    const fetchLessons = async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/ziresefr-courses/ldlms-lessons`,{
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
            const response = await fetch(`${API_BASE_URL}/ziresefr-posts/posts`,{
                method:'GET',
                headers:{
                    //Authorization: `Basic ${auth}`,
                    "Content-Type": "application/json",
                }
            });

            
        } catch {

        }
    }



    const chunkCourses = async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/ziresefr-courses/chunk-courses`,{
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                }
            });
            
        } catch {

        }
    }


    const fetchChunks = async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/rag/chunks`,{
                method:'GET',
                headers:{
                    "Content-Type": "application/json",
                }
            });
            
        } catch {

        }
    }


    const fetchUserProgress = async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/ziresefr-connection/user-progress/${2772}`,{
                method:'GET',
                headers:{
                    "Content-Type": "application/json",
                }
            });
            
        } catch {

        }
    }


    const regenerateCourses = async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/ziresefr-courses/reset-ldlms-courses`,{
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                }
            });

            fetchLdlmsCourses();
            fetchLessons();
            
        } catch {

        }
    }
    


    useEffect(() => {
        fetchWpUsers();
        fetchWcProducts();
        fetchLdlmsCourses();
        fetchLdlmsLessons();
        fetchPosts();
        chunkCourses();
        fetchChunks();
        fetchUserProgress();
        fetchLessons();
    },[])


    return (
        <div>
            <Button
            onClick={regenerateCourses}
            >Regenerate Courses</Button>
        </div>
    )
}

export default Test;