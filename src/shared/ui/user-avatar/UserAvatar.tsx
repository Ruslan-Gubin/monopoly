import { FC, memo } from "react";
import { iconConstants } from "@/shared/constants";

import styles from './UserAvatar.module.scss';

interface UserAvatarProps {
  image: string;
  size?: 'sm' | 'md' | 'lg' | 'vsm'
  onClick?: () => void
  title?: string
}

const UserAvatar: FC<UserAvatarProps> = memo(({ size='sm', image, onClick, title }) => {

  const avatarSize = `user_img__${size}`

  const avatarImg = image ? image : iconConstants.userNoImg

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
});

UserAvatar.displayName = 'UserAvatar'

export  { UserAvatar };