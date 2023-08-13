import { FC, useMemo, useState } from "react";
import { BoardModel, PlayerModel, useCells, useProperty } from "@/entities";
import { ButtonRG } from "@/shared";

import { BoardActiveModal } from "../board-active-modal/BoardActiveModal";

interface Props {
  board: BoardModel
  player: PlayerModel
  handleSendAction: (body: object) => void;
}

export interface IPropertyUpdateObj {
  name: string;
  price: number;
  id: string;
  position: number;
}

const UpdateProperty: FC<Props> = ({ board, player, handleSendAction }) => {
  const { propertyes } = useProperty()
  const { cells } = useCells()
  const [ update, setUpdate ] = useState<boolean>(true)
  const [modal, setModal] = useState(false)
  const [propertyActive, setPropertyActive] = useState<IPropertyUpdateObj | null>(null)

  const updateList = useMemo(() => {
    return propertyes.reduce((acc: IPropertyUpdateObj[], property) => {
      if (property.owner === player._id && property.is_sindicate && property.house_count <= 4 && !property.is_mortgage) {
        const propertyCell = cells?.find(cell => cell.position === property.position)
        if (propertyCell && propertyCell.house_cost && player.money >= propertyCell.house_cost) {
          acc.push({name: propertyCell.name, price: propertyCell.house_cost, id: property._id, position: property.position })
        };
      }
      setPropertyActive(acc[0])
      return acc
    }, []).sort((a, b) => a.position - b.position)
  }, [cells, propertyes, player])

  if (board &&  updateList.length === 0 || !update ) {
    return null;
  }

  const handleUpdateProperty = () => {
    if (propertyActive === null) return;

    handleSendAction({
      method: 'updateProperty',
      body: {
        ws_id: board.ws_id,
        property_id: propertyActive.id,
        player_id: player._id,
        price: propertyActive.price,
        player_name: player.name,
        cellName: propertyActive.name,
      }
    })
    handleToggleModal()
    setUpdate(() => false)
  }

  const handleToggleModal = () => {
    setModal(prev => !prev)
  }

  return (
    <>
    <BoardActiveModal
    submitText="Улучшить"
    updateList={updateList}
    modal={modal}
    propertyActive={propertyActive}
    clickProperty={setPropertyActive}
    handleSubmit={handleUpdateProperty}
    handleToggleModal={handleToggleModal}
    />
    <ButtonRG
      handleClick={handleToggleModal} 
      color="success" 
      type="button" 
      >
      Улучшение
      </ButtonRG>
    </>
  );
};

export { UpdateProperty };