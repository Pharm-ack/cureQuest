"use client";
import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdSettingsInputComponent } from "react-icons/md";
import { PiUserSwitchDuotone } from "react-icons/pi";
import { TbFilePencil } from "react-icons/tb";

const dashboardLinks = [
  {
    label: "Posts",
    href: "/posts",
    icon: <TbFilePencil className="h-4 w-4" />,
  },
  {
    label: "Users",
    href: "/users",
    icon: <PiUserSwitchDuotone className="h-4 w-4" />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <MdSettingsInputComponent className="h-4 w-4" />,
  },
];

export default function DashboardSiderbar() {
  const pathName = usePathname();
  return (
    <nav className="grid items-start px-4 text-sm font-medium">
      {dashboardLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 ${
            pathName === link.href
              ? "text-gray-900 bg-gray-100"
              : "text-gray-500"
          }`}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
      {/* <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 bg-gray-100 text-gray-500 transition-all hover:text-gray-900  "
      >
        <HomeIcon className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/posts"
        className="flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900 transition-all hover:text-gray-900   "
      >
        <TbFilePencil className="h-4 w-4" />
        Posts
      </Link>

      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900  "
      >
        <PiUserSwitchDuotone className="h-4 w-4" />
        Users
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900  "
      >
        <MdSettingsInputComponent className="h-4 w-4" />
        Settings
      </Link> */}
    </nav>
  );
}
