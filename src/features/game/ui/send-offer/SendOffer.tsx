import { ButtonRG } from "@/shared";


const SendOffer = () => {

  const handleSendOffer = () => {
    console.log('отправить предложение')
  }

  return (
      <ButtonRG
      handleClick={handleSendOffer} 
      color="success" 
      type="button" 
      >
      Отправить предложение
      </ButtonRG>
  );
};

export { SendOffer };