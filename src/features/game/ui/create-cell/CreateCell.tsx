import { FormEvent } from "react";
import { fetchPost } from "@/shared";


const CreateCell = () => {

  const handleCreateCell = async(e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault()
    
    // const cellObj = {
    //   board_name: e.target[0].value,
    //   type: e.target[1].value,
    //   name: e.target[2].value,
    //   direction: e.target[3].value,
    //   price: e.target[4].value,
    //   position: e.target[5].value,
    //   color: e.target[6].value,
    //   house_cost: e.target[7].value,
    //   hotel_cost: e.target[8].value,
    //   mortgage_value: e.target[9].value,
    //   position_matrix_row: e.target[10].value,
    //   position_matrix_column: e.target[11].value,
    //   rent: [50, 100, 200, 600, 1400, 1700, 2000]
    // }
  
      // await fetchPost('create-cell', cellObj)
      // .then(data => console.log(data))
      // .catch(data => console.log(data))
    }

  return (
    <form name='create cell' onSubmit={handleCreateCell}>
      <input type="text" placeholder='имя доски' />
      <input type="text" placeholder='тип карточки' />
      <input type="text" placeholder='name' />
      <input type="text" placeholder='направление' />
      <input type="number" placeholder='цена за собственность' />
      <input type="number" placeholder='позиция на доске' />
      <input type="text" placeholder='цвет собственности' />
      <input type="number" placeholder='стоимость магазина' />
      <input type="number" placeholder='стоимость торгового дома' />
      <input type="text" placeholder='ипотека' />
      <input type="number" placeholder='позиция матрицы ряда' />
      <input type="number" placeholder='позиция матрицы колонки' />
    <button  type='submit'>Создать ячейку</button>
    </form>
  );
};

export { CreateCell };