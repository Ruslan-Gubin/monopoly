import { FC, useMemo, useState } from "react";
import { BoardModel, PlayerModel, useBoardAction, useCells, usePlayer, useProperty } from "@/entities";
import { ButtonRG, ModalRG } from "@/shared";

import styles from './UpdateProperty.module.scss';

interface Props {
  board: BoardModel
  player: PlayerModel
}

export interface IPropertyUpdateObj {
  name: string;
  price: number;
  id: string;
  position: number;
}

const UpdateProperty: FC<Props> = ({ board, player }) => {
  const { propertyes } = useProperty()
  const { cells } = useCells()
  const [ update, setUpdate ] = useState<boolean>(true)
  const [modal, setModal] = useState(false)
  const [propertyActive, setPropertyActive] = useState<IPropertyUpdateObj | null>(null)
  const { boardSockedSend } = useBoardAction()

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
  }, [cells, propertyes])

  if (board &&  updateList.length === 0 || !update ) {
    return null;
  }



  const handleUpdateProperty = () => {
    if (propertyActive === null) return;

    boardSockedSend({
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
    <ModalRG 
    active={modal}
    handleClose={handleToggleModal}
    handleCancel={handleToggleModal}
    submitModal={handleUpdateProperty}
    footer={{ cancelText: 'Отмена', submitText: 'Улучшить' }}
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
      Улучшение
      </ButtonRG>
    </>
  );
};

export { UpdateProperty };