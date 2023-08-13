import {
  ProfileButtons,
  ProfileChangeFoto,
  ProfileInfo,
  ProfileModal,
  ProfileAvatar,
} from "@/features";

import styles from "./ViewerProfile.module.scss";

const ViewerProfile = () => {
  return (
    <section className={styles.root}>
      <ProfileModal />
      <div className={styles.avatar_container}>
        <ProfileAvatar />
        <ProfileButtons />
        <ProfileChangeFoto className={styles.update_svg} />
      </div>
      <ProfileInfo />
    </section>
  );
};

export { ViewerProfile };
