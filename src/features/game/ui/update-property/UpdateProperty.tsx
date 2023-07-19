import { ButtonRG } from "@/shared";


const UpdateProperty = () => {

  const handleUpdateProperty = () => {
    console.log('Улучшение')
  }

  return (
    <ButtonRG
      handleClick={handleUpdateProperty} 
      color="success" 
      type="button" 
      >
      Улучшение
      </ButtonRG>
  );
};

export { UpdateProperty };