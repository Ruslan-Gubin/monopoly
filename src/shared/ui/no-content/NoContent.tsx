import styles from './NoContent.module.scss';

interface NoContentProps {
title: string;
hint?: string;
}

const NoContent = ({ title, hint }: NoContentProps) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>
      {hint && 
      <p className={styles.hint}>{hint}</p>
      }
    </div>
  );
};

export { NoContent };