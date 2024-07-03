"use client";

import { Button } from "./ui/button";

type SiginBtnProps = {
  onClick: () => void;
  children?: React.ReactNode;
};

export default function SiginBtn({ onClick, children }: SiginBtnProps) {
  return (
    <Button onClick={onClick} variant="outline" className="w-full">
      {children}
    </Button>
  );
}
