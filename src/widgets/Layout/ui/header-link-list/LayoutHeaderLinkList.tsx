import  { FC } from 'react';
import { HEADER_LINKS } from '../../lib/config'

import styles from './LayoutHeaderLinkList.module.scss';

interface LayoutHeaderLinkListProps {
  handleLink: (patch: string) => void
  pathname: string
}

const LayoutHeaderLinkList: FC<LayoutHeaderLinkListProps> = ({ handleLink, pathname }) => {


  return (
    <ul className={styles.root}>
    {HEADER_LINKS.map(item => 
      <li onClick={() => handleLink(item.patch)} key={item.text}>
      <p className={pathname === item.patch ? `${styles.link_text} ${styles.link_active}` : styles.link_text}>{item.text}</p>
      </li>
      )}
  </ul>
  );
};

export { LayoutHeaderLinkList };