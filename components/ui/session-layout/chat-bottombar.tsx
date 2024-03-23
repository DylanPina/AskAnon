"use client";

import { FileImage, Mic, Paperclip, PlusCircle, SendHorizontal, Smile, ThumbsUp } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { EmojiPicker } from "@/components/emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar() {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      //handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="ml-6 max-w-4xl relative">
      <Textarea
        autoComplete="off"
        value={message}
        ref={inputRef}
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        name="message"
        placeholder="Ask a question!"
        className="mb-6 w-full border flex items-center h-9 resize-none overflow-hidden bg-white bg-opacity-5"
      ></Textarea>
      <div className="absolute right-2 bottom-0.5 text-white">
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
  );
}
