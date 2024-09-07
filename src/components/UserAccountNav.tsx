'use client'
import { User } from 'next-auth'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSubContent,DropdownMenuTrigger } from './ui/dropdown-menu'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import ProfilePic from './ProfilePic'
export const runtime = 'edge';
type Props = {
    user:Pick <User,"name"|"image"|"email">
}

const UserAccountNav = ({user}: Props) => {
  return (
    <DropdownMenu>
  <DropdownMenuTrigger>
    <ProfilePic user={user} />
  </DropdownMenuTrigger>
  <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-zinc-300 dark:border-gray-700 rounded-lg shadow-lg z-50" align="end">
    <div className="flex items-center justify-start gap-2 p-2">
      <div className="flex flex-col space-y-1 leading-none">
        {user.name && <p className="font-medium">{user.name}</p>}
        {user.email && (
          <p className="w-[200px] truncate text-sm text-zinc-700 dark:text-zinc-200">
            {user.email}
          </p>
        )}
      </div>
    </div>
    <DropdownMenuSeparator />
    <DropdownMenuItem asChild>
      <Link href="/">Hello</Link>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem
      onSelect={(event) => {
        event.preventDefault();
        signOut().catch(console.error);
      }}
      className="text-red-600 cursor-pointer"
    >
      Sign Out
      <LogOut className="w-4 h-4 ml-2" />
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default UserAccountNav