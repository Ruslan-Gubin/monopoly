import { useViewer } from '@/entities';
import { InputRG } from '@/shared';
import {  useViewerFeatures, useViewerFeaturesAction } from '../../model';

import styles from './ProfileInfo.module.scss';

const ProfileInfo = () => {
  const { changeName } = useViewerFeaturesAction()
  const { newName } = useViewerFeatures()
  const { viewer } = useViewer()
  


  return (
    <div className={styles.user_info__container}>
      <InputRG
        onChange={(e) => changeName(e.target.value)}
        className={styles.input_field}
        label="Name:"
        value={String(newName ? newName : viewer?.fullName)} 
      />
      <InputRG
        onChange={() => {}}
        className={styles.input_field}
        label="Email:"
        value={String(viewer?.email)}
      />
    </div>
  );
};

export { ProfileInfo };