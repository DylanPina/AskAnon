"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import exitIcon from "/public/images/exit-session.svg";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import UserCount from "../user_count";
import { useUser } from "@auth0/nextjs-auth0/client";
import { deleteSession, leaveSession } from "@/lib/data/session";

export default function SessionInfo() {
  const pathname = usePathname();
  const { user } = useUser();
  const sessionCode = pathname.split("/").pop();
  const [userCount, setUserCount] = useState(0);
  const [isProfessor, setIsProfessor] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!sessionCode) return;

    const fetchIsProfessor = async () => {
      const sessionRef = doc(db, "sessions", sessionCode.toString());
      const docSnap: any = await getDoc(sessionRef);
      if (docSnap.exists()) {
        setIsProfessor(docSnap.data().professor === user?.email);
      }
    };

    fetchIsProfessor();

    const usersRef = collection(
      db,
      "sessions",
      sessionCode.toString(),
      "users",
    );

    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      setUserCount(snapshot.size);
    });

    return () => unsubscribe();
  }, [sessionCode, user]);

  const handleDeleteSession = async () => {
    if (!sessionCode || !user || !user.email) return;

    await deleteSession(sessionCode);
    router.push("/");
  };

  const handleLeaveSession = async () => {
    if (!sessionCode || !user || !user.email) return;

    await leaveSession(user.email, sessionCode);

    router.push("/");
  };

  return (
    <div className="flex items-center justify-center w-full py-2 bg-primary-white/5">
      <div className="flex justify-between items-center w-full max-w-[1200px]">
        <Button className="bg-opacity-0 visibility: invisible">
          <Image
            priority
            src={exitIcon}
            width={50}
            height={50}
            alt="Exit Session"
          />
        </Button>
        <div className="flex flex-col items-center">
          <strong>
            <span className="text-xl text-white">{sessionCode}</span>
          </strong>
          <UserCount count={userCount} />
        </div>
        {isProfessor ? (
          <Button
            onClick={handleDeleteSession}
            className="bg-red-500 hover:shadow-red-500 hover:bg-red-500"
          >
            Delete Session
          </Button>
        ) : (
          <Button
            onClick={handleLeaveSession}
            className="bg-red-500 hover:shadow-red-500 hover:bg-red-500"
          >
            Leave
          </Button>
        )}
      </div>
    </div>
  );
}
