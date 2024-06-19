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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages?.length, patientId]);

  return (
    <div className="flex flex-col justify-between w-full p-2 flex-1">
      <div className="w-full overflow-y-auto overflow-x-hidden  flex flex-col flex-1">
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
