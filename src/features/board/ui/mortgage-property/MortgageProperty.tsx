import { FC, useEffect, useMemo, useState } from "react";
import { BoardModel, PlayerModel, useBoardAction, useCells, useProperty } from "@/entities";
import { ButtonRG, ModalRG } from "@/shared";
import { IPropertyUpdateObj } from "../update-property/UpdateProperty";
import { checkGameOver } from "../../utils";

import styles from './MortgageProperty.module.scss';

interface Props {
  board: BoardModel
  player: PlayerModel
}

const MortgageProperty: FC<Props> = ({ board, player }) => {
  const { cells } = useCells()
  const { propertyes } = useProperty()
  const { boardSockedSend } = useBoardAction()
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
  }, [cells, propertyes])

  const checkOver =  checkGameOver(updateList, player, board)

  useEffect(() => {
    if (!checkOver) return;

      boardSockedSend({
        method: 'playerGameOver',
        body: {
          ws_id: board.ws_id,
          player_id: player._id,
          player_name: player.name,
        }
      })
  }, [])
  
  if (checkOver || updateList.length === 0) {
    return null;
  }

  const handleMortgageProperty = () => {
    if (propertyActive === null) return;
    
    boardSockedSend({
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
    <ModalRG
    active={modal}
    handleClose={handleToggleModal}
    handleCancel={handleToggleModal}
    submitModal={handleMortgageProperty}
    footer={{ cancelText: 'Отмена', submitText: 'Заложить' }}
    title='Выбирите собственность'
    >
      <ul className={styles.propertyList}>
        {updateList.map(property => 
          <li 
          key={property.id} 
          className={propertyActive?.id === property.id ? `${styles.property_item} ${styles.activeProperty}` : styles.property_item} 
          onClick={() => setPropertyActive(property)} 
          >
            <span className={styles.property_item__name}>{property.name}</span>
            <span className={styles.property_item__price}> {property?.price} Руб</span>
          </li>
        )}
      </ul>
    </ModalRG>
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