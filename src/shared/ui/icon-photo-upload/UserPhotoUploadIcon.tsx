
import styles from './UserPhotoUploadIcon.module.scss';

const UserPhotoUploadIcon = ({ onClick }:{ onClick: () => void } ) => {

  return (
    <div onClick={onClick} className={styles.root}>
      <div className={styles.container}>
      <div className={styles.user}></div>
      </div>
      <div className={styles.circle}></div>
      <div className={styles.cross_horizont}></div>
      <div className={styles.cross_vertical}></div>
      <div className={styles.sun}></div>
    </div>
  );
};

export { UserPhotoUploadIcon };