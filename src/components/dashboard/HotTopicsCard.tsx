import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomWordCloud from "../CustomWordCloud";
import { prisma } from "@/lib/db";
export const runtime = 'edge';

type Props = {};

const HotTopicsCard = async (props: Props) => {
  const topics= await prisma.topic_count.findMany({})
  const formattedTopics=topics.map(topic => {
    return {
      text: topic.topic,
      value: topic.count
    }
  })

  return (
    <Card className="col-span-4 hover:cursor-pointer hover:opacity-75 border border-orange bg-orange-100 dark:bg-orange-900 transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a quiz on it.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <CustomWordCloud formattedTopics={formattedTopics}/>
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;