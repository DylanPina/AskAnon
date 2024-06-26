"use client";

import React, { useEffect, useState } from "react";
import MessageList from "@/components/ui/session-layout/message-list";
import { db } from "@/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const Page: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { user } = useUser();
  const { id } = params;
  const [sessionExists, setSessionExists] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const sessionRef = doc(db, "sessions", id);

    const unsubscribe = onSnapshot(sessionRef, (docSnapshot) => {
      setSessionExists(docSnapshot.exists());
    });

    return () => {
      unsubscribe();
    };
  }, [id, router, user]);

  if (!sessionExists) {
    router.push("/");
  }

  return <MessageList sessionId={id} />;
};

export default Page;
