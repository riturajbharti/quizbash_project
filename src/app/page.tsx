import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session=await getAuthSession()
  if(session?.user){
    redirect('/dashboard')
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <div className="group hover:bg-orange-100 dark:hover:bg-orange-900 transition-all duration-200 rounded-lg overflow-hidden max-w-md w-full">
    <Card className="hover:cursor-pointer border border-orange bg-orange-100 dark:bg-orange-900 transition-all duration-200">
      <CardHeader className="bg-orange-500 dark:bg-orange-800 text-white py-4 px-6">
        <CardTitle>Welcome to QuizBash 💫!</CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <CardDescription>
          The curious fox ventured into the meadow, where vibrant wildflowers danced in the gentle breeze. Nearby, a babbling brook sparkled under the warm sun. Butterflies fluttered lazily, and birds sang melodious tunes.
        </CardDescription>
        <div className="mt-4">
          <SignInButton text="Sign In with Google" />
        </div>
      </CardContent>
    </Card>
  </div>
</div>



  )
}
