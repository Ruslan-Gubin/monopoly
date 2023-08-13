'use client'
import { useMemo } from "react";
import { useBoard, useBoardAction, useSelect, useViewer } from "@/entities";
import { ConfirmSelectedColor, ModalSuccess, useGameConfirmation, useGameConfirmationAction } from "@/features";
import { useCancelConfirmation } from "@/features";
import { ModalRG, TimerDecreasing } from "@/shared";
import { ConfirmPlayerList } from "../confirm-playerList/ConfirmPlayerList";

const SelectionGameConfirmation = () => {
  const { isModalActive, players, sessionId } = useGameConfirmation() 
  const { cancelParticipationGame } = useCancelConfirmation()
  const { cancelConfinmPlayer } = useGameConfirmationAction()
  const { createBoard } = useBoardAction()
  const { viewer } = useViewer()
  const { owner } = useSelect()
  const { gameBoardId, isGoGame } = useBoard()


  const checkIsActive = useMemo(() => {
    const findViewer = players.find(player => player.id === viewer?.viewerId)
    if (!findViewer) {
      return false
    }
    return findViewer.confirmation
  },[players, viewer])

  if (!isModalActive) { 
    return null;
  }

  const handleCancelTimeParticipation = () => {
    if (!sessionId) return;

    const checkConfirmations = players.find(player => !player.confirmation)  

    if (checkConfirmations) {
      cancelParticipationGame({name: checkConfirmations.fullName})
    } else {
      if (owner && !gameBoardId && !isGoGame) {
       createBoard(players)
      }
      cancelConfinmPlayer({ sessionId })
    }

  }

  return (
     <ModalRG 
     active={isModalActive}
     handleClose={() => cancelParticipationGame({name: viewer?.fullName})}
     >
      <TimerDecreasing  duration={30} endCallback={handleCancelTimeParticipation} />
      <ConfirmSelectedColor checkIsActive={checkIsActive} /> 
      <ConfirmPlayerList players={players} checkIsActive={checkIsActive} />
      <ModalSuccess checkIsActive={checkIsActive} />
      </ModalRG>
  );
};

export { SelectionGameConfirmation };