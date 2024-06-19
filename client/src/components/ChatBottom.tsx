import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useDoctor from "@/hooks/useDoctor";
// import useMessages from "@/hooks/useMessage";

const ChatBottom = ({ patientId }: { patientId: string }) => {
  const [text, setText] = useState("");
  //   const { createMessage } = useMessages();
  const { createMessage, getMessages } = useDoctor();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!text) return;

    await createMessage(text, patientId);
    await getMessages(patientId);

    setText("");
  };
  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <Input
        autoComplete="off"
        value={text}
        onChange={handleInputChange}
        name="text"
        placeholder="Write something..."
        className=" w-full border rounded-full flex items-center resize-none overflow-hidden bg-background"
      />
      <Button
        onClick={handleSubmit}
        className="text-white hover:text-primary-foreground"
        disabled={!text}
      >
        Send
      </Button>
    </div>
  );
};

export default ChatBottom;
