import React from "react";
import { Message } from "@/lib/definitions/message";
import { MessageBubble } from "./message-bubble";

export const MessageList: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const groupedMessages = messages.reduce((acc, message) => {
    const lastGroup = acc[acc.length - 1];
    if (lastGroup && lastGroup[lastGroup.length - 1].uid === message.uid) {
      lastGroup.push(message);
    } else {
      acc.push([message]);
    }
    return acc;
  }, [] as Message[][]);

  return (
    <div className="flex flex-col space-y-4 p-3 overflow-y-auto">
      {groupedMessages.map((group, index) => (
        <MessageBubble key={index} group={group} />
      ))}
    </div>
  );
};
