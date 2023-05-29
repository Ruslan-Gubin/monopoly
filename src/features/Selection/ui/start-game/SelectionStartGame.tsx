import { useSelect } from '@/entities';
import { ButtonRG } from '@/shared';


const SelectionStartGame = () => {
  const {  owner, playersCount } = useSelect();

  const activeStart = playersCount >= 2 && owner

  if (!activeStart) {
    return null
  }

  return (
    <ButtonRG color="success" handleClick={() => {}}>
          Начать игру
        </ButtonRG>
  );
};

export { SelectionStartGame };