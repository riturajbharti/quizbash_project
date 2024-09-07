'use client'
import { Progress } from './ui/progress';
import Image from 'next/image'
import React from 'react'
export const runtime = 'edge';

type Props = { finished: boolean };

const loadingTexts = [
    "Generating questions...",
    "Formulating inquisitive thoughts...",
    "Unlocking the treasure trove of inquiries...",
    "Navigating through the galaxy of curiosity...",
    "Tapping into the wellspring of questions...",
    "Lighting the spark of knowledge and discovery...",
    "Crafting a symphony of thoughtful queries...",
    "Exploring the realms of curiosity and insight...",
    "Charting the stars of intellectual pursuit...",
  ];

const LoadingQuestions = ({finished}: Props) => {
    const [progress,setProgress] = React.useState(0);
    const [loadingText, setLoadingText] = React.useState(loadingTexts[0]);

    React.useEffect(()=>{
        const interval = setInterval(() => {
            let randomIndex = Math.floor(Math.random() * loadingTexts.length);
            setLoadingText(loadingTexts[randomIndex]);
          }, 2000);
          return () => clearInterval(interval);
    },[])

    React.useEffect(() => {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (finished) return 100;
            if (prev === 100) {
              return 0;
            }
            if (Math.random() < 0.1) {
              return prev + 2;
            }
            return prev + 0.5;
          });
        }, 100);
        return () => clearInterval(interval);
      }, [finished]);

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
      <Image src={"/Loading.gif"} width={400} height={400} alt="Couldn't Load Component" />
      <Progress value={progress} className="w-full mt-4" />
      <h1 className="mt-2 text-xl">{loadingText}</h1>
    </div>
  )
}

export default LoadingQuestions