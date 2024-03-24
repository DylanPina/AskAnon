import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

export const useSessionMessages = (sessionId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const messagesQuery = query(
      collection(db, "sessions", sessionId, "messages"),
    );

    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot: any) => {
      const fetchedMessages: any = [];
      querySnapshot.forEach((doc: any) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(fetchedMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [sessionId]);

  return { messages, loading };
};
