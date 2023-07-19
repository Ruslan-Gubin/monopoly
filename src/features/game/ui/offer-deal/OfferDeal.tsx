import { ButtonRG } from "@/shared";


const OfferDeal = () => {

  const handleOfferDeal = () => {
    console.log('Предложить сделку')
  }

  return (
    <ButtonRG
      children="Предложить сделку"   
      handleClick={handleOfferDeal} 
      color="success" 
      type="button" 
      />
  );
};

export { OfferDeal };