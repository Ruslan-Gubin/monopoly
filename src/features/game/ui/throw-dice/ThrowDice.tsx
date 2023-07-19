import { ButtonRG } from "@/shared";


const ThrowDice = () => {

  const handleTrowDice = () => {
    console.log('Бросить кости')
  }

  return (
    <ButtonRG
      children="Бросить кости"  
      handleClick={handleTrowDice} 
      color="success" 
      type="button" 
      />
  );
};

export { ThrowDice };