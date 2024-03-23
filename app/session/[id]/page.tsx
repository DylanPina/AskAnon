import ChatListTest from "@/components/ui/chat_list_test";
import React from "react";
import type { Metadata } from "next";
import { MessageList } from "@/components/ui/session-layout/message-list";
import { mockMessages } from "@/lib/mock-data/messages-mock-data";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: params.id,
  };
}

const Page: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;

  return (
    <div className="flex-grow flex flex-col space-y-3 justify-end">
      <MessageList messages={mockMessages} />
    </div>
  );
};

export default Page;
