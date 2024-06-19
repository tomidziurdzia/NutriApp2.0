import { ChatBottom, ChatMessage } from "@/components";
import useDoctor from "@/hooks/useDoctor";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { patientId } = useParams();

  const { getMessages, messages } = useDoctor();

  useEffect(() => {
    getMessages(patientId!);
  }, [messages?.length, patientId]);

  return (
    <div className="flex flex-col justify-between w-full h-full p-2">
      <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
        <AnimatePresence>
          {messages?.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </AnimatePresence>
      </div>
      <ChatBottom patientId={patientId!} />
    </div>
  );
};

export default Chat;
