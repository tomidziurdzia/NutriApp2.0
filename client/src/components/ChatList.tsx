import { Chat } from "@/endpoints/chat.endpoint";
import { NavLink } from "react-router-dom";

const ChatList = ({ chat }: { chat: Chat }) => {
  return (
    <NavLink
      to={`/chats/${chat?.patientId}`}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
    >
      {chat.patient?.name} {chat.patient?.lastname}
    </NavLink>
  );
};

export default ChatList;
