'use client';
import Lottie from "lottie-react";
import React, { useEffect, useState } from 'react';
import { animationData } from "@/public/images/animation";


export default function BobPrefillingLoading(props: any) {
    const { width, color } = props;
    const texts = ['Analyzing market trends',
        'Crafting innovative solutions',
        'Optimizing performance metrics',
        'Synthesizing AI strategies',
        'Exploring new business frontiers',
        'Personalizing business approach'
    ]
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTextIndex((prevIndex) =>
                prevIndex === texts.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [texts]);

    return (
        <div className="flex justify-center items-center flex-col">
            <Lottie
                animationData={animationData}
                style={{
                    width: `${width}px`
                }}
                className="flex justify-center items-center"
                loop={true}
            />
            <p
                style={{
                    color
                }}
                className='my-2 font-semibold !text-2xl'>
                {texts[currentTextIndex]}
            </p>
        </div>
    );
}