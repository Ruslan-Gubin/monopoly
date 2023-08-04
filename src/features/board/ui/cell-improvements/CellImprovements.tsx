import styles from './CellImprovements.module.scss';

interface CellImprovementsProps {
  direction: "center-top" | 'center-bottom' | 'side-left' | 'side-right' | 'corner';
  name: string;
  cost: number;
  color: string;
}

const CellImprovements = ({ direction, cost, name, color }: CellImprovementsProps) => {

  return (
    <div className={`${styles.root} ${styles[direction]}`}>
      <div className={`${styles.improvement_container} ${styles[`improvement_container__${color}`]}`}>
        <ul className={styles.houses}>
        {/* <House count={0} /> */}
        <div>houses</div>
        </ul>
      </div>
      {/* <CellProperty cost={cost} name={name} /> */}
      <div>cellProperty</div>
    </div>
  );
};

export { CellImprovements };