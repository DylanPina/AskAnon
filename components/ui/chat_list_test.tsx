"use client";

import { useSessionMessages } from "@/lib/hooks/useSessionMessages";

export default function ChatListTest({ sessionId }: { sessionId: string }) {
  const { messages, loading } = useSessionMessages(sessionId);

  if (loading) return <div>Loading messages...</div>;
  return (
    <div>
      {messages.length ? (
        messages.map((message) => (
          <div key={message.id}>
            <strong>{message.fakeName}</strong>: {message.content}
          </div>
        ))
      ) : (
        <div>No messages</div>
      )}
    </div>
  );
}
