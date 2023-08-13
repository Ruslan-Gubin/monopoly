import { FC, useEffect, useMemo, useState } from "react";
import { BoardModel, CellModel, PlayerModel, useProperty } from "@/entities";
import { ButtonRG } from "@/shared";
import { IPropertyUpdateObj } from "../update-property/UpdateProperty";
import { checkGameOver } from "../../utils";


import { BoardActiveModal } from "../board-active-modal/BoardActiveModal";

interface Props {
  board: BoardModel
  player: PlayerModel
  cells: CellModel[];
  handleSendAction: (body: object) => void;
}

const MortgageProperty: FC<Props> = ({ board, player, cells, handleSendAction }) => {
  const { propertyes } = useProperty()
  const [modal, setModal] = useState(false)
  const [propertyActive, setPropertyActive] = useState<IPropertyUpdateObj | null>(null)
  
  const updateList = useMemo(() => {
    return propertyes.reduce((acc: IPropertyUpdateObj[], property) => {
      if (property.owner === player._id && !property.is_sindicate  && !property.is_mortgage) {
        const propertyCell = cells?.find(cell => cell.position === property.position)
        if (propertyCell && propertyCell.mortgage_value) {
          acc.push({name: propertyCell.name, price: propertyCell.mortgage_value, id: property._id, position: property.position })
        };
      }
      setPropertyActive(acc[0])
      return acc
    }, []).sort((a, b) => a.position - b.position)
  }, [cells, propertyes, player])

  const checkOver =  checkGameOver(updateList, player, board)

  useEffect(() => {
    if (!checkOver) return;

      handleSendAction({
        method: 'playerGameOver',
        body: {
          ws_id: board.ws_id,
          player_id: player._id,
          player_name: player.name,
          board_id: board._id,
        }
      })
  }, [board, checkOver, player, handleSendAction])
  
  if (checkOver || updateList.length === 0) {
    return null;
  }

  const handleMortgageProperty = () => {
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
        value: true,
      }
    })
  }

  const handleToggleModal = () => {
    setModal(prev => !prev)
  }

  return (
    <>
    <BoardActiveModal
    submitText="Заложить"
    updateList={updateList}
    modal={modal}
    propertyActive={propertyActive}
    clickProperty={setPropertyActive}
    handleSubmit={handleMortgageProperty}
    handleToggleModal={handleToggleModal}
    />
    <ButtonRG
      handleClick={handleToggleModal} 
      color="success" 
      type="button" 
      >
      Заложить собственность
    </ButtonRG>
    </>
  );
};

export { MortgageProperty };