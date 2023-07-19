import { ButtonRG } from "@/shared";


const BuyProperty = () => {

  const handleBuyProperty = () => {
    console.log('Купить собственность')
  }

  return (
    <ButtonRG
      children="Купить"   
      handleClick={handleBuyProperty} 
      color="success" 
      type="button" 
      />
  );
};

export { BuyProperty };