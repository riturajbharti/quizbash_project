import {z} from 'zod'

export const quizCreationSchema=z.object({
    topic:z.string().min(5,{message:"Atleast 5 characters Needed"}).max(50,{message:"Not More than 50characters Needed"}),
    type:z.enum(["mcq","open_ended"]),
    amount:z.number().min(1).max(10),
})

export const checkAnswerSchema=z.object({
    questionId:z.string(),
    userAnswer:z.string()
})

export const endGameSchema = z.object({
    gameId: z.string(),
  });
