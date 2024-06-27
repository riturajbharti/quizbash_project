import { getAuthSession } from "@/lib/nextauth";
import React from "react";
import SignInButton from "./SignInButton";
import Link from "next/link";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <div className="fixed inset-x-0 top-0 bg-orange-50 dark:bg-orange-950 z-10 h-fit border-b border-orange-300 dark:border-orange-700 py-3">
  <div className="flex items-center justify-between h-full gap-3 px-6 mx-auto max-w-7xl">
    {/* Logo */}
    <Link href={"/"} className="flex items-center gap-2">
      <p className="rounded-lg border-2 border-b-4 border-r-4 border-orange-500 px-3 py-1 text-xl font-bold text-orange-800 dark:text-orange-200 transition-all transform hover:scale-105 hover:bg-gradient-to-r from-orange-200 via-orange-400 to-orange-500 dark:hover:bg-gradient-to-r dark:from-orange-800 dark:via-orange-600 dark:to-orange-400 hover:text-shadow-md hover:shadow-lg">
        QuizBash
      </p>
    </Link>
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <div className="flex items-center gap-1">
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <SignInButton text={"Sign In"} />
        )}
      </div>
    </div>
  </div>
</div>


  );
};

export default Navbar;
