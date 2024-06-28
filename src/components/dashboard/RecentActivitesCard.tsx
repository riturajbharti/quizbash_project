import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import HistoryComponent from "../HistoryComponent";

type Props = {};

const RecentActivitiesCard = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const gameCount = await prisma.game.count({
    where: {userId:session.user.id}
  })
  return (
    <Card className="col-span-4 lg:col-span-3 hover:cursor-pointer hover:opacity-75 border border-orange bg-orange-100 dark:bg-orange-900 transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/history">Recent Activity</Link>
        </CardTitle>
        <CardDescription>
          You have played a total of {gameCount} quizzes.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll">
        <HistoryComponent limit={10} userId={session.user.id}/>
      </CardContent>
    </Card>
  );
};

export default RecentActivitiesCard;