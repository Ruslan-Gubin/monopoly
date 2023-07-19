import { ButtonRG } from "@/shared";


const ThrowDice = () => {

  const handleTrowDice = () => {
    console.log('Бросить кости')
  }

  return (
    <ButtonRG
      handleClick={handleTrowDice} 
      color="success" 
      type="button" 
      >
      Бросить кости
    </ButtonRG>
  );
};

export { ThrowDice };