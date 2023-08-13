import { FC, useMemo, useState } from "react";
import { BoardModel, PlayerModel, useCells, useProperty } from "@/entities";
import { ButtonRG } from "@/shared";
import { IPropertyUpdateObj } from "../update-property/UpdateProperty";

import { BoardActiveModal } from "../board-active-modal/BoardActiveModal";

interface Props {
  board: BoardModel;
  player: PlayerModel
  handleSendAction: (body: object) => void;
}

const BuyBackProperty: FC<Props> = ({ board, player, handleSendAction }) => {
  const { propertyes } = useProperty()
  const { cells } = useCells()
  const [modal, setModal] = useState(false)
  const [propertyActive, setPropertyActive] = useState<IPropertyUpdateObj | null>(null)

  const updateList = useMemo(() => {
    return propertyes.reduce((acc: IPropertyUpdateObj[], property) => {
      if (property.owner === player._id  &&  property.is_mortgage) {
        const propertyCell = cells?.find(cell => cell.position === property.position)

        if (propertyCell && propertyCell.price && player.money >= propertyCell.price) {
          acc.push({name: propertyCell.name, price: propertyCell.price, id: property._id, position: property.position })
        };
      }
      setPropertyActive(acc[0])
      return acc
    }, []).sort((a, b) => a.position - b.position)
  }, [cells, propertyes, player])

  if (board && board.action !== 'start move' || updateList.length === 0  || player?.in_jail) {
    return null;
  }



  const handleBuyBackPropery = () => {
    if (propertyActive === null) return;

    handleSendAction({
      method: 'mortgageProperty',
      body: {
        ws_id: board.ws_id,
        property_id: propertyActive.id,
        player_id: player._id,
        price: propertyActive.price,
        player_name: player.name,
        cellName: propertyActive.name,
        value: false,
      }
    })
    handleToggleModal()
  }

  const handleToggleModal = () => {
    setModal(prev => !prev)
  }

  return (
    <>
    <BoardActiveModal
    submitText="Выкупить"
    updateList={updateList}
    modal={modal}
    propertyActive={propertyActive}
    clickProperty={setPropertyActive}
    handleSubmit={handleBuyBackPropery}
    handleToggleModal={handleToggleModal}
    />
    <ButtonRG
      handleClick={handleToggleModal} 
      color="success" 
      type="button" 
      >
      Выкупить недвижимость
      </ButtonRG>
    </>
  );
};

export { BuyBackProperty };