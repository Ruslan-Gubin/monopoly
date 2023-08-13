import { FC } from "react";
import { ModalRG } from "@/shared";
import { IPropertyUpdateObj } from "../update-property/UpdateProperty";

import styles from './BoardActiveModal.module.scss';

interface BoardActiveModalProps {
  updateList: IPropertyUpdateObj[];
  clickProperty: (value: IPropertyUpdateObj) => void;
  propertyActive: IPropertyUpdateObj | null;
  modal: boolean;
  handleToggleModal: () => void;
  handleSubmit: () => void;
  submitText: 'Выкупить' | 'Заложить' | 'Улучшить'
}

const BoardActiveModal: FC<BoardActiveModalProps> = ({ submitText, handleSubmit, handleToggleModal, modal, updateList, clickProperty, propertyActive, }) => {
   
  return (
    <ModalRG
    active={modal}
    handleClose={handleToggleModal}
    handleCancel={handleToggleModal}
    submitModal={handleSubmit}
    footer={{ cancelText: 'Отмена', submitText }}
    title='Выбирите собственность'
    >
      <ul className={styles.propertyList}>
        {updateList.map(property => 
          <li 
          key={property.id} 
          className={propertyActive?.id === property.id ? `${styles.property_item} ${styles.activeProperty}` : styles.property_item} 
          onClick={() => clickProperty(property)} 
          >
            <span className={styles.property_item__name}>{property.name}</span>
            <span className={styles.property_item__price}> {property?.price} Руб</span>
          </li>
        )}
      </ul>
    </ModalRG>
  );
};

export { BoardActiveModal };