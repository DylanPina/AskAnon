"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useProfessors } from "@/lib/hooks/useProfessors";
import { createSession } from "@/lib/data/session";

interface Props {
  sessionCode: string;
}

export default function CreateSessionButton({ sessionCode }: Props) {
  const { user } = useUser();
  const { professors, loading: professorsLoading } = useProfessors();
  const [isProfessor, setIsProfessor] = useState(false);

  useEffect(() => {
    if (!professorsLoading && user) {
      setIsProfessor(
        professors.some((professor) => professor.email === user.email),
      );
    }
  }, [user, professors, professorsLoading]);

  async function handleClick() {
    if (!user || !user.email || !sessionCode || !isProfessor) {
      return;
    }

    await createSession(user.email, sessionCode);
  }

  if (!isProfessor) return null;

  return (
    <Button
      onClick={handleClick}
      className="bg-primary-gray w-[150px] border border-white hover:bg-white hover:text-primary-gray"
    >
      Create
    </Button>
  );
}
