import { useFormStatus } from "react-dom";
import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";

export default function DonateBtn() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button type="submit" className="w-full ">
          <LuLoader2 className="animate-spin h-4 w-4 mr-2" /> Processing...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Donate Now
        </Button>
      )}
    </>
  );
}
