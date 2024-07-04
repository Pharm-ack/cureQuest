"use client";
import Logo from "./logo";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MdMenu } from "react-icons/md";

const routes = [
  {
    name: "About",
    link: "/about",
  },

  {
    name: "Blog",
    link: "/blogs",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "Donate",
    link: "/donate",
  },
];

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <span className="sr-only">Home</span>
            <Logo />
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {routes.map((route) => (
                  <li key={route.link}>
                    <Link
                      className="text-sm font-medium hover:underline underline-offset-4"
                      href={route.link}
                    >
                      {route.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full border border-gray-200 w-8 h-8"
                      >
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <span className="sr-only">Toggle user menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/dashboard/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button onClick={() => signOut({callbackUrl: "/login"})}>Logout</button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    className="inline-flex h-9 text-gray-900 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm shadow-md transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 font-semibold"
                    href="/register"
                  >
                    Join Now
                  </Link>
                )}
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button className="md:hidden" size="icon" variant="ghost">
                    <MdMenu className="h-7 w-7" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 bg-gray-50">
                  <ul className="flex flex-col gap-y-6 text-sm p-2">
                    {routes.map((route) => (
                      <li key={route.link}>
                        <Link
                          className="text-gray-900 hover:underline hover:text-gray-900"
                          href={route.link}
                        >
                          {route.name}
                        </Link>
                      </li>
                    ))}
                    
                  </ul>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
