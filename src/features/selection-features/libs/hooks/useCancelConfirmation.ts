import { useSelect, useSelectAction } from "@/entities";
import { useGameConfirmation } from "../../model";


export const useCancelConfirmation = () => {
  const { selectionSendMessage } = useSelectAction()
  const { authId } = useSelect()
  const { sessionId } = useGameConfirmation()

  const cancelParticipationGame =  ({ name }: {name?: string}) => {
    if (!authId || !sessionId ||  !name) return;
    
    selectionSendMessage<{
      method: string,
      body: {
        authId: string;
        sessionId: string;
        authName: string;
      }
    }>({
      method: 'cancelParticipationGame',
      body: {
       authId,
       sessionId,
       authName: name,
      }
    })
  }

  return { cancelParticipationGame }

}

