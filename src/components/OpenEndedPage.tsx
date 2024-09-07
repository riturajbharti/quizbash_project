'use client'
import { Game, Question } from "@prisma/client";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import { cn, formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";
import MCQCounter from "./MCQCounter";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { checkAnswerSchema,endGameSchema } from "@/schemas/forms/quiz";
import axios from "axios";
import BlankAnswerInput from "./BlankAnswerInput";
import Link from "next/link";
export const runtime = 'edge';
type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
};

const OpenEnded = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);

  const [hasEnded, setHasEnded] = React.useState(false);
  const { toast } = useToast();

  const [now,setNow] = React.useState<Date>(new Date());
  const [blankAnswer,setBlankAnswer]= React.useState<string>("")


  React.useEffect(()=> {
    const interval =setInterval(()=> {
      if(!hasEnded){
        setNow(new Date())
      }
    },1000)
    return () => {
      clearInterval(interval)
    }
  },[hasEnded])

  const currentQuestions = React.useMemo(() => {
    // if(questionIndex==0){
    //   const date=new Date()
    //   setTimeStarted(date)
    // }
    // console.log(game.questions)
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.post(`/api/endGame`, payload);
      return response.data;
    },
  });

  const { mutate: checkAnswer, isPending: isChecking } = useMutation({
    mutationFn: async () => {
        let filledAnswer=blankAnswer
        document.querySelectorAll('#user-blank-input').forEach((input) => {
            filledAnswer=filledAnswer.replace("_____",input.value)
            input.value=''
        })
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestions.id,
        userAnswer: filledAnswer,
      };
      const response = await axios.post("/api/checkAnswer", payload);
      return response.data;
    },
  });

  const handleNext = React.useCallback(() => {
    if (isChecking) return;

    checkAnswer(undefined, {
      onSuccess: ({ percentageSimilar }) => {
        toast({
            title:`Your answer is ${percentageSimilar}% similar to the correct answer,`,
            description:'based on similarity Comparison'
        })
        if (questionIndex == game.questions.length - 1) {
          endGame();
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, toast, isChecking, game.questions.length, questionIndex,blankAnswer,endGame]);



  React.useEffect(()=>{
    const handleKeyDown=(event: KeyboardEvent)=>{
        if(event.key==='Enter'){
            handleNext();
        }
    }
    document.addEventListener('keydown',handleKeyDown);
    return ()=>{
        document.removeEventListener("keydown",handleKeyDown);
    };
  },[handleNext]);


  if(hasEnded){
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="px-4 py-2 mt-2 font-semibold text-white bg-orange-500 rounded-md whitespace-nowrap">
        You Completed in{" "}
        {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
      </div>
      <Link
        href={`/statistics/${game.id}`}
        className={cn(buttonVariants({ size: "lg" }), "mt-2")}
      >
        View Statistics
        <BarChart className="w-4 h-4 ml-2" />
      </Link>
    </div>
    )
  }

  return (
    // <pre>{JSON.stringify(game,null,4)}</pre>
    <div className="absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] pt-64 pb-32">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p>
            <span className="text-slate-400 mr-2">Topic</span>
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>
        {/* topic */}

        {/* <MCQCounter correct_answers={correctAnswers} wrong_answers={wrongAnswers} /> */}
      </div>

      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestions?.question}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center w-full mt-4">
        <BlankAnswerInput answer={currentQuestions.answer} setBlankAnswer={setBlankAnswer}/>
        <Button
          className="mt-2"
          variant={"special"}
          disabled={isChecking}
          onClick={() => {
            handleNext();
          }}
        >
          {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OpenEnded;
