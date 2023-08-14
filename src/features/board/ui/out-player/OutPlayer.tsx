import { FC } from "react";
import { ModalRG } from "@/shared";
import { useBoard, useBoardAction, usePlayer } from "@/entities";

interface OutPlayerProps {
  toggleModal: () => void;
  modal: boolean
}

const OutPlayer: FC<OutPlayerProps> = ({ toggleModal, modal }) => {
  const { boardSockedSend } = useBoardAction()
  const { board } = useBoard()
  const { player } = usePlayer()

  if (!board || !player) return null;

  const handleOutPlayer = () => {
    boardSockedSend({
      method: 'playerGameOver',
      body: {
        ws_id: board.ws_id,
        player_id: player._id,
        player_name: player.name,
        board_id: board._id,
      }
   })
   toggleModal()
  }

  return (
    <>
     <ModalRG
     active={modal}
     handleClose={toggleModal}
     handleCancel={toggleModal}
     submitModal={handleOutPlayer}
     footer={{ submitText: 'Покинуть', cancelText: 'Отмена' }}
     title='Вы хотите покинуть игру?'
     />
    </>
  );
};

export { OutPlayer };