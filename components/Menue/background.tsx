"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const BACKGROUNDS = [
    "/nightSky2.webp",
    "/nightSky3.webp",
    //"/nightSky.webp",
];

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Background() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const bi = getRandomInt(0,BACKGROUNDS.length-1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % BACKGROUNDS.length);
        }, 10000); 

        return () => clearInterval(interval);  
    }, []);

    return (

        <div className="fixed inset-0 -z-20">
        
            <Image
                src={BACKGROUNDS[bi]}
                alt="GTD background"
                fill
                priority
                className="object-cover transition-opacity duration-1000"
            />
        
            {/* Dark overlay */}
            <div className="
              absolute
              inset-0
              bg-[#160b2b]/40
            " />
        
          </div>
    );
}