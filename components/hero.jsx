"use client";
import Link from 'next/link.js'
import React, { useRef, useEffect } from 'react'
import { Button } from './ui/button.jsx'
import Image from 'next/image.js'

const HeroSection = () => {
    const imageRef = useRef();

    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosituin = window.scrollY;
            const scrollThreshold = 100;

            if (scrollPosituin > scrollThreshold) {
                imageElement.classList.add('scrolled');
        }else{
            imageElement.classList.remove('scrolled');
        }
            };

        window.addEventListener('scroll',handleScroll);

        return () => {window.removeEventListener('scroll', handleScroll)};
    }, []);
  return (
    <div className="pb-20 px-4">
        <div className="container mx-auto text-center">
            <h1 className="text-5xl md:test-8xl lg:text-[100px] pb-6 gradient-title">
            Take Control of Your Finances <br/> with Intelligence
            </h1>   
            <p className='text-xl textgray-600 mb-8 max-w-2xl mx-auto'>
            AI powered financial assistant that helps easily track, manage, and grow your money.
            </p>
            <div className='flex justify-center space-x-4'>
                <Link href="/dashboard">
                    <Button size="lg" className="px-8">
                        Get Started
                    </Button>
                </Link>
                <Link href="/https://github.com/zakiscoding/projects">
                    <Button size="lg" variant="outline" className="px-8">
                        Tutorial: View on GitHub
                    </Button>
                </Link>
            </div>
            <div className="hero-image-wrapper">
                <div ref={imageRef}  className="hero-image">
                    <Image
                    src="/banner.jpeg"
                    width={1280}
                    height={720}
                    alt="Dashboard Preview"
                    className="rounded-lg shadow-2xl border mx-auto"
                    priority
                />
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection
    