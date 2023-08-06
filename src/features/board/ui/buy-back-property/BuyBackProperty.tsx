import { FC, useMemo, useState } from "react";
import { BoardModel, PlayerModel, useBoardAction, useCells, useProperty } from "@/entities";
import { ButtonRG, ModalRG } from "@/shared";
import { IPropertyUpdateObj } from "../update-property/UpdateProperty";

import styles from './BuyBackProperty.module.scss';

interface Props {
  board: BoardModel;
  player: PlayerModel
}


const BuyBackProperty: FC<Props> = ({ board, player }) => {
  const { propertyes } = useProperty()
  const { cells } = useCells()
  const [modal, setModal] = useState(false)
  const [propertyActive, setPropertyActive] = useState<IPropertyUpdateObj | null>(null)
  const { boardSockedSend } = useBoardAction()

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

    boardSockedSend({
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
    <ModalRG 
    active={modal}
    handleClose={handleToggleModal}
    handleCancel={handleToggleModal}
    submitModal={handleBuyBackPropery}
    footer={{ cancelText: 'Отмена', submitText: 'Выкупить' }}
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
      Выкупить недвижимость
      </ButtonRG>
    </>
  );
};

export { BuyBackProperty };