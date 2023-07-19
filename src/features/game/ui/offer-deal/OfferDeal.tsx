import { ButtonRG } from "@/shared";


const OfferDeal = () => {

  const handleOfferDeal = () => {
    console.log('Предложить сделку')
  }

  return (
    <ButtonRG 
      handleClick={handleOfferDeal} 
      color="success" 
      type="button" 
      >
      Предложить сделку
      </ButtonRG>
  );
};

export { OfferDeal };