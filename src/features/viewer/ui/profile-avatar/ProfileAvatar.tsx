import {  ViewerAvatar } from "@/entities";
import { useViewerFeatures } from "../../model";

import styles from './ProfileAvatar.module.scss';

const ProfileAvatar = () => {
  const { activeFoto } = useViewerFeatures();

  return (
    <div className={styles.root}>
      <ViewerAvatar
      image={activeFoto ? activeFoto : ''}
      size="lg"
      />
    </div>
  );
};

export { ProfileAvatar };