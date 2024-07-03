"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Posts",
    href: "/dashboard/posts",
  },
  {
    name: "Users",
    href: "/dashboard/users",
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
  },
];

export default function DashboardNavbar() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            link.href === pathname
              ? "bg-gray-50 p-2 text-gray-900 rounded"
              : "text-muted-foreground hover:underline"
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}
