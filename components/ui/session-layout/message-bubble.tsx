import React from "react";
import { Message } from "@/lib/definitions/message";

type MessageBubbleProps = {
  group: Message[];
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ group }) => (
  <div className="flex items-start ml-4">
    {group.length > 0 && (
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mt-6">
        {group[0].fakeName.slice(0, 2).toUpperCase()}
      </div>
    )}
    <div className="flex flex-col space-y-2 text-s max-w-xs mx-2 items-start">
      {group.map((message, idx) => (
        <div key={idx}>
          {idx === 0 && (
            <>
              <span className="text-white">{message.fakeName}</span>
              <span className="ml-2 text-sm text-gray-500">{new Date(message.createdAt).toLocaleTimeString()}</span>
            </>
          )}
          <div>
            <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">{message.content}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
