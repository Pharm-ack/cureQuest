import React from "react";
import { LuLoader2 } from "react-icons/lu";

export default function Loading() {
  return (
    <div className="flex pl-5 justify-center items-center min-h-screen">
      <LuLoader2 className="animate-spin h-8 w-8" />
    </div>
  );
}
