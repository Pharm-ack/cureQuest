import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MdMenu } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardNavbar from "@/components/dashboard-navbar";
import { SignoutBtn } from "@/components/custom-btn";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-gray-900 text-white">
          <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="sticky top-0 flex h-16 items-center justify-between gap-4">
              <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <DashboardNavbar />
              </nav>

              <Sheet>
                <SheetTrigger asChild>
                  <Button className="md:hidden" size="icon" variant="ghost">
                    <MdMenu className="h-7 w-7" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <nav className="flex flex-col gap-6 text-lg font-medium mt-5">
                    <DashboardNavbar />
                  </nav>
                </SheetContent>
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignoutBtn />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
          </div>
        </div>
        <main className="my-3">
          <SessionProvider> {children}</SessionProvider>
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
