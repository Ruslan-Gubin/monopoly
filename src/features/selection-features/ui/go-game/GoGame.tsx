import { useBoard, useBoardAction } from "@/entities";
import { ButtonRG, useRouterNavigation } from "@/shared";


const GoGame = () => {
  const {  goToGameRemove } = useBoardAction()
  const { navigateDinamicId } = useRouterNavigation()
  const { gameBoardId } = useBoard()

  const handleGoGame = () => {
  if (!gameBoardId) return;
  navigateDinamicId('/game-board/', gameBoardId)
  goToGameRemove()
  }

  return (
    <div>
      <ButtonRG color="warning" handleClick={handleGoGame}>
      Войти в игру
    </ButtonRG>
    </div>
  );
};

export { GoGame };