import { useSelectAction, useViewer } from "@/entities";
import { SendMessageSVG } from "@/shared";

interface SendMessageProps {
  value: string;
  cancelValue: () => void;
}

const SendMessage = ({ value, cancelValue }: SendMessageProps) => {
  const { viewer, authId } = useViewer();
  const { selectionSendMessage } = useSelectAction();

  const handleSendMessage = () => {
    if (!viewer || value.length <= 2) return;

    selectionSendMessage({
      method: "createMessage",
      body: {
        text: value,
        authorId: authId,
        fullName: viewer?.fullName,
        image: viewer?.image.url,
      },
    });
    cancelValue()
  };


  return (
    <SendMessageSVG onClick={handleSendMessage} />
  );
};

export { SendMessage };
