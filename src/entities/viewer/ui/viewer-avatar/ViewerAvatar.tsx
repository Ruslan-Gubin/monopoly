import { FC } from "react";
import { viewerConstant } from "../../lib";

import styles from './ViewerAvatar.module.scss';

interface ViewerAvatarProps {
  image: string;
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  title?: string
}

const ViewerAvatar: FC<ViewerAvatarProps> = ({size='sm', image, onClick, title}) => {

 const avatarSize = `user_img__${size}`

 const avatarImg = image ? image : viewerConstant.userNoImg

  return (
    <picture onClick={onClick}>
        <img 
        title={title} 
        className={`${styles.user_img} ${styles[avatarSize]}`} 
        src={avatarImg} 
        alt="User image" 
        />
    </picture>
  );
};

export { ViewerAvatar };