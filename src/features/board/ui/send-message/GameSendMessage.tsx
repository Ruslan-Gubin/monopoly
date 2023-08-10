import { useBoard, useBoardAction, usePlayer } from "@/entities";
import { SendMessageSVG } from "@/shared";

interface GameSendMessageProps {
  value: string;
  cancelValue: () => void
}

const GameSendMessage = ({ value, cancelValue}: GameSendMessageProps) => {
  const { boardSockedSend } = useBoardAction()
  const { player } = usePlayer()
  const { board } = useBoard()

  const handleSendMessage = () => {
    if (!player || !board) return;
    
    boardSockedSend({
      method: 'sendMessage',
      body: {
        player_name: player?.name,
        ws_id: board.ws_id,
        text: value,
      }
    })
    cancelValue()
  }

  return (
      <SendMessageSVG onClick={handleSendMessage} />
  );
};

export { GameSendMessage };