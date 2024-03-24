import ChatListTest from "@/components/ui/chat_list_test";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: params.id,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="flex flex-col space-y-3">
      <ChatListTest sessionId={id}></ChatListTest>
    </div>
  );
}
