import { useViewer } from "@/entities";
import { ButtonRG } from "@/shared";
import { checkUpdateUser } from "../../libs/helpers/checkViewerFoto";
import { useViewerFeatures, useViewerFeaturesAction } from "../../model";

import styles from "./ProfileButtons.module.scss";

const ProfileButtons = () => {
  const { activeFoto, newName } = useViewerFeatures();
  const { openModal } = useViewerFeaturesAction();
  const { viewer, loading } = useViewer();

  return (
    <>
      <ButtonRG
        disabled={!checkUpdateUser(newName, viewer?.fullName, activeFoto) || loading}
        className={styles.button}
        handleClick={() => openModal("update")}
        color="warning"
      >
        Update
      </ButtonRG>
      <ButtonRG
        disabled={loading}
        className={styles.button}
        handleClick={() => openModal("remove")}
        color="danger"
      >
        Delete
      </ButtonRG>
    </>
  );
};

export { ProfileButtons };
