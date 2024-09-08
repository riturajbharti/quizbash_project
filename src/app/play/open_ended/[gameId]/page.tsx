import OpenEnded from "@/components/OpenEndedPage";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    gameId: string;
  };
};

const OpenEndedPage = async ({ params: { gameId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          answer:true,
        },
      },
    },
  });
  if (!game || game.gameType === "mcq") {
    return redirect("/quiz");
  }else if(game.questions.length==0){
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <div className="group hover:bg-orange-100 dark:hover:bg-orange-900 transition-all duration-200 rounded-lg overflow-hidden max-w-md w-full">
    <Card className="hover:cursor-pointer border border-orange bg-orange-100 dark:bg-orange-900 transition-all duration-200">
      <CardHeader className="bg-orange-500 dark:bg-orange-800 text-white py-4 px-6">
        <CardTitle>Thank you for using QuizBash 💫!</CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <CardDescription>
          Oops the Questions couldn&apost be generated because of too much traffic,
          Please try after sometime or with less number of questions!!
          Thank You!!
        </CardDescription>
        <div className="mt-4">
        <div className="flex items-center space-x-2">
            <Link href="/quiz" className={buttonVariants({
                variant:"special_2"
            })}>
              <LucideLayoutDashboard className="mr-2" />
              Create Quiz Again!!
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
    )
  }
  return (
    // <MCQ game={game}/>
   <OpenEnded game={game}/>
    // <div>{JSON.stringify(game,null,2)}</div>
  )
};

export default OpenEndedPage;