
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.root}>
      <picture>
      <img className={styles.loader} src={'/loader.png'} alt="loader icon" />
      </picture>
    </div>
  );
};

export { Loader };