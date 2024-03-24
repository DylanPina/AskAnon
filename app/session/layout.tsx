import Session_Info from "@/components/ui/session-layout/session-info";
import { Textarea } from "@/components/ui/textarea";
import { EmojiPicker } from "@/components/emoji-picker";
import ChatBottombar from "@/components/ui/session-layout/chat-bottombar";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col justify-between">
      <Session_Info></Session_Info>
      <div className="flex justify-center overflow-y-auto max-h-full">
        <div className="w-1/2">
          {children}
          <ChatBottombar></ChatBottombar>
        </div>
      </div>
    </div>
  );
}
