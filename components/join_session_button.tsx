import React from "react";
import { Button } from "./ui/button";

interface Props {
  sessionCode: string;
}

export default function JoinSessionButton({ sessionCode }: Props) {
  return (
    <Button className="bg-primary-gray w-[150px] border border-white hover:bg-white hover:text-primary-gray">
      Join
    </Button>
  );
}
