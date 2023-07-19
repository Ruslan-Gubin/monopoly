import { ButtonRG } from "@/shared";


const AuctionRefresh = () => {

  const handleAuctionRefresh = () => {
    console.log('Объявить аукцион')
  }

  return (
    <ButtonRG  
      handleClick={handleAuctionRefresh} 
      color="success" 
      type="button" 
      >
      Объявить аукцион
     </ButtonRG>   
  );
};

export { AuctionRefresh };