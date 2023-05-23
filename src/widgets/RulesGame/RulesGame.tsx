import  { FC } from 'react';
import { IRules } from '@/app/types/RulesInterface';
import styles from './RulesGame.module.scss';

interface RulesGameProps {
  rules: IRules[]
}

const RulesGame: FC<RulesGameProps> = ({rules}) => {

  return (
    <>
    <ul className={styles.wrapper}>
      {rules.map((item, index) => 
      <li key={index}>
        {item.title && <h2 className={styles.title}>{item.title}</h2>}
        {item.src && 
        <picture>
        <img className={styles.img} src={item.src} alt="rules images" />
        </picture>
        }
        <p className={styles.text}>{item.description}</p>
        {item.tagging && <p className={styles.text}>{item.tagging}</p>}
        {item.hotel && <p className={styles.text}>{item.hotel}</p>}
        <ul>
        {item.list && item.list.map(item => 
        <li key={item}>
          <p className={styles.list_item}>{item}</p>
        </li>  
        )}
        </ul>
      </li>
      )}
    </ul>
      </>
  );
};

export  {RulesGame};