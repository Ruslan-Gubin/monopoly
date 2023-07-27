'use client'
import { useEffect, useMemo } from "react";
import { useBoard, useBoardAction, useSelect, useViewer } from "@/entities";
import { ConfirmSelectedColor, ModalSuccess, useGameConfirmation, useGameConfirmationAction } from "@/features";
import { useCancelConfirmation } from "@/features";
import { ModalRG, TimerDecreasing, useRouterNavigation } from "@/shared";
import { ConfirmPlayerList } from "../confirm-playerList/ConfirmPlayerList";

const SelectionGameConfirmation = () => {
  const { isModalActive, players, sessionId } = useGameConfirmation() 
  const { cancelParticipationGame } = useCancelConfirmation()
  const { cancelConfinmPlayer } = useGameConfirmationAction()
  const { createBoard, goToGameRemove } = useBoardAction()
  const { viewer } = useViewer()
  const { owner } = useSelect()
  const { navigateDinamicId } = useRouterNavigation()
  const { gameBoardId, isGoGame } = useBoard()

  useEffect(() => {
    if (!isGoGame || !gameBoardId) return;
    navigateDinamicId('/game-board/', gameBoardId)
    
    return () => {
      goToGameRemove()
    }
  },[isGoGame, gameBoardId])


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
      <TimerDecreasing  duration={6} endCallback={handleCancelTimeParticipation} />
      <ConfirmSelectedColor checkIsActive={checkIsActive} /> 
      <ConfirmPlayerList players={players} checkIsActive={checkIsActive} />
      <ModalSuccess checkIsActive={checkIsActive} />
      </ModalRG>
  );
};

export { SelectionGameConfirmation };