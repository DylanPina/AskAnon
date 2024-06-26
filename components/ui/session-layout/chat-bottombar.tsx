"use client";

import { FileImage, Paperclip } from "lucide-react";
import React, { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { EmojiPicker } from "@/components/emoji-picker";
import { createMessage } from "@/lib/data/message";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar() {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useUser();
  const pathname = usePathname();
  const sessionCode = pathname.split("/")[pathname.split("/").length - 1];

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (message && user && user.email) {
        await createMessage(sessionCode, user.email, message);
        setMessage("");
      }
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="relative w-full max-w-[1200px]">
        <Textarea
          autoComplete="off"
          value={message}
          ref={inputRef}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          name="message"
          placeholder="Ask a question!"
          className="text-white mb-6 w-full relative justify-self-center border h-10 resize-none overflow-hidden bg-white bg-opacity-5"
        ></Textarea>

        <div className="absolute right-2 bottom-1 text-white">
          <EmojiPicker
            onChange={(value) => {
              setMessage(message + value);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
