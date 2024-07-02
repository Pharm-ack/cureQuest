import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png"
        width={256}
        height={100}
        alt="Logo"
        className={cn("w-14", className)}
      />
      <span className="text-white font-semibold flex items-center justify-center">
        CureQuest
      </span>
    </Link>
  );
}
