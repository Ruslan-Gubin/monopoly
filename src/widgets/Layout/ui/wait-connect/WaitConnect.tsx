
import styles from './WaitConnect.module.scss';

const WaitConnect = () => {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
      <p className={styles.text}>Идет соединение c сервером...</p>
      </div>
    </div>
  );
};

export { WaitConnect };