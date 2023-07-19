import { SendMessageSVG } from "@/shared";


interface GameSendMessageProps {
  value: string;
  cancelValue: () => void;
}

const GameSendMessage = ({ value, cancelValue }: GameSendMessageProps) => {

  const handleSendMessage = () => {
    console.log('send')
  }

  return (
    <div>
      <SendMessageSVG onClick={handleSendMessage} />
    </div>
  );
};

export { GameSendMessage };