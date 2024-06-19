import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import useDoctor from "@/hooks/useDoctor";
import usePatient from "@/hooks/usePatient";
import { Message } from "@/endpoints/chat.endpoint";

const ChatMessage = ({ message }: { message: Message }) => {
  const { messages, doctor } = useDoctor();
  const { patient } = usePatient();

  let owner;
  if (message.owner === "PATIENT" && !doctor) {
    owner = "PATIENT";
  }

  if (message.owner === "DOCTOR" && !patient) {
    owner = "DOCTOR";
  }

  return (
    <motion.div
      key={message.id}
      layout
      initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
      transition={{
        opacity: { duration: 0.1 },
        layout: {
          type: "spring",
          bounce: 0.3,
          duration: messages?.indexOf(message) || 1 * 0.05 + 0.2,
        },
      }}
      style={{
        originX: 0.5,
        originY: 0.5,
      }}
      className={`flex flex-col px-4 py-2 gap-4 ${
        owner === "PATIENT" && "items-end"
      } 
      
       ${owner === "DOCTOR" && "items-end"}    `}
    >
      <div className="flex gap-3 items-center">
        {owner !== patient?.role && patient && (
          <div className="flex gap-3 items-center">
            <Avatar className="flex justify-center items-center">
              <AvatarImage
                className="w-8"
                alt="@shadcn"
                src={message.doctor?.avatar}
              />
            </Avatar>
          </div>
        )}

        {owner === patient?.role && doctor && (
          <div className="flex gap-3 items-center">
            <Avatar className="flex justify-center items-center">
              <AvatarImage
                className="w-8"
                alt="@shadcn"
                src={message.patient?.avatar}
              />
            </Avatar>
          </div>
        )}

        <span className=" p-3 rounded-md bg-gray-100 max-w-xs">
          {message.text}
        </span>

        {owner === "DOCTOR" && (
          <div className="flex gap-3 items-center">
            <Avatar className="flex justify-center items-center">
              {doctor && (
                <AvatarImage
                  className="w-8"
                  alt="@shadcn"
                  src={doctor?.avatar}
                />
              )}
            </Avatar>
          </div>
        )}
        {owner === "PATIENT" && (
          <div className="flex gap-3 items-center">
            <Avatar className="flex justify-center items-center">
              {patient && (
                <AvatarImage
                  className="w-8"
                  alt="@shadcn"
                  src={patient?.avatar}
                />
              )}
            </Avatar>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
