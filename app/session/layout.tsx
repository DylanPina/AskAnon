import Session_Info from "@/components/ui/session-layout/session-info";
import ChatBottombar from "@/components/ui/session-layout/chat-bottombar";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Session_Info></Session_Info>
      {children}
      <ChatBottombar></ChatBottombar>
    </div>
  );
}
