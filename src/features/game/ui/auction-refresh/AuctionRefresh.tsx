import { ButtonRG } from "@/shared";


const AuctionRefresh = () => {

  const handleAuctionRefresh = () => {
    console.log('Объявить аукцион')
  }

  return (
    <ButtonRG
      children="Объявить аукцион"   
      handleClick={handleAuctionRefresh} 
      color="success" 
      type="button" 
      />
  );
};

export { AuctionRefresh };