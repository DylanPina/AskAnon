"use client";

import React from "react";
import { Button } from "./ui/button";
import { joinSession } from "@/lib/data/session";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

interface Props {
  sessionCode: string;
}

export default function JoinSessionButton({ sessionCode }: Props) {
  const { user } = useUser();
  const router = useRouter();

  async function handleClick() {
    if (!sessionCode || !user || !user.email) return;
    await joinSession(user.email, sessionCode);

    router.push(`/session/${sessionCode}`);
  }

  return (
    <Button
      onClick={handleClick}
      className="bg-primary-gray w-[150px] border border-white hover:bg-white hover:text-primary-gray"
    >
      Join
    </Button>
  );
}
