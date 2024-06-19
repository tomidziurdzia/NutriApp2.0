import { Chat, ChatList, NewChatForm } from "@/components";
import useDoctor from "@/hooks/useDoctor";

const Chats = () => {
  const { chat } = useDoctor();

  return (
    <div className="flex p-2">
      <div className="flex flex-col w-40 gap-4">
        <NewChatForm chat={chat} />

        {chat?.map((chat) => (
          <ChatList key={chat.id} chat={chat} />
        ))}
      </div>
      <Chat />
    </div>
  );
};

export default Chats;
