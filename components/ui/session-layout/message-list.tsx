"use client";

import React from "react";
import { MessageBubble } from "./message-bubble";
import { Message } from "@/lib/definitions/message";
import { useSessionMessages } from "@/lib/hooks/useSessionMessages";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

interface Props {
  sessionId: string;
}

export default function MessageList({ sessionId }: Props) {
  const { messages, loading } = useSessionMessages(sessionId);
  const pathname = usePathname();
  const { user } = useUser();
  const sessionCode = pathname.split("/").pop();
  const [isProfessor, setIsProfessor] = useState(false);
  const [profesorEmail, setProfesorEmail] = useState("");

  useEffect(() => {
    if (!sessionCode) return;

    const fetchIsProfessor = async () => {
      const sessionRef = doc(db, "sessions", sessionCode.toString());
      const docSnap: any = await getDoc(sessionRef);
      if (docSnap.exists()) {
        setProfesorEmail(docSnap.data().professor);
        setIsProfessor(docSnap.data().professor === user?.email);
      }
    };

    fetchIsProfessor();
  }, [sessionCode, user]);

  // Sort messages by createdAt
  const sortedMessages = messages.sort((a: Message, b: Message) => {
    const aTime = a.createdAt.seconds + a.createdAt.nanoseconds * 1e-9;
    const bTime = b.createdAt.seconds + b.createdAt.nanoseconds * 1e-9;
    return aTime - bTime;
  });

  return (
    <div className="flex flex-col place-self-center space-y-4 h-full max-w-[1200px] overflow-y-auto no-scrollbar w-full">
      {loading && <div>Loading...</div>}
      {!loading && sortedMessages.length === 0 ? (
        <div className="text-center py-4 text-white font-bold text-2xl">
          No messages... yet
        </div>
      ) : (
        sortedMessages.map((message: Message, index: number) => (
          <MessageBubble
            key={index}
            group={[message]}
            isProfessor={isProfessor}
            professorEmail={profesorEmail}
          />
        ))
      )}
    </div>
  );
}
