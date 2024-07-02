"use client";
import Logo from "./logo";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
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
          <div className="md:flex md:items-center md:gap-12">
            <span className="sr-only">Home</span>
            <Logo />
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6">
                {routes.map((route, idx) => (
                  <li key={`route-${idx}`}>
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
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex">
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
                    <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button onClick={() => signOut()}>Logout</button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  className="inline-flex h-10 text-gray-900 items-center justify-center rounded-lg border border-gray-200  bg-gray-50 px-6 text-sm shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 font-semibold"
                  href="/register"
                >
                  Join Now
                </Link>
              )}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="shrink-0 md:hidden"
                  size="lg"
                  variant="secondary"
                >
                  <MdMenu className="h-8 w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-gray-50">
                <ul className="flex flex-col gap-y-6 text-sm p-2">
                  {routes.map((route, idx) => (
                    <li key={`route-${idx}`}>
                      <Link
                        className="text-gray-900 hover:underline hover:text-gray-900"
                        href={route.link}
                      >
                        {route.name}
                      </Link>
                    </li>
                  ))}
                  <div className="sm:hidden flex justify-self-start items-center">
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
                        <DropdownMenuContent align="start">
                          <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link href="/profile">Profile</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                          <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link
                        className="inline-flex h-10 text-gray-900 items-center justify-center rounded-lg border border-gray-200  bg-gray-50 px-6 text-sm shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 font-semibold"
                        href="/register"
                      >
                        Join Now
                      </Link>
                    )}
                  </div>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
