import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function page() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="md:pb-[5.5rem]">
        <div className="border shadow-sm rounded-lg">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Profile details
              </CardTitle>
              <CardDescription>
                Update your profile information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-6">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p>Pharmack</p>
                  </div>
                  <Button className="w-fit" variant="outline" size="sm">
                    <Link href="#">Update profile</Link>
                  </Button>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="grid gap-1">
                <h3 className="text-lg font-semibold">Connected accounts</h3>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-6">
                  <div className="flex items-center gap-2">
                    <FaGoogle className="h-6 w-6" />
                    <div>- Olumofe6@gmail.com</div>
                  </div>
                  <Button className="w-fit" variant="outline" size="sm">
                    Disconnect
                  </Button>
                </div>
              </div>
              <DropdownMenuSeparator />
            </CardContent>
            <CardFooter>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
