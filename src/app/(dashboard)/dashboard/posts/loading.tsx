import { LuLoader2 } from "react-icons/lu";

export default function Loading() {
  return (
    <div className="flex py-20 justify-center items-center">
      <LuLoader2 className="animate-spin h-8 w-8" />
    </div>
  );
}
