import { ButtonRG } from "@/shared";


const BuyProperty = () => {

  const handleBuyProperty = () => {
    console.log('Купить собственность')
  }

  return (
    <ButtonRG  
      handleClick={handleBuyProperty} 
      color="success" 
      type="button" 
      >
      Купить
    </ButtonRG>
  );
};

export { BuyProperty };