import SessionInfo from "@/components/ui/session-layout/session-info";
import ChatBottombar from "@/components/ui/session-layout/chat-bottombar";

export default function ChatLayout({ children }: React.PropsWithChildren<any>) {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-10 pb-2">
        <SessionInfo />
      </div>

      {children}

      <div className="sticky bottom-0 pt-2 z-10">
        <ChatBottombar />
      </div>
    </div>
  );
}
