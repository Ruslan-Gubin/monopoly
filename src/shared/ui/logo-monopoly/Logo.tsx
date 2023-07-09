import { FC, memo } from 'react';
import styles from './Logo.module.scss';

interface LogoProps {
  onClick: (patch: string) => void
}

const Logo: FC<LogoProps> = memo(({ onClick }) => {

  return (
    <div onClick={() => onClick('/')} className={styles.root}>
    <h1 role="link" className={styles.logo_text}>Monopoly</h1>
  </div>
  );
});

Logo.displayName = 'Logo';

export { Logo };