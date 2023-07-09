import { useViewer, useViewerAction } from "../../../../entities";
import { ModalRG, useRouterNavigation } from "../../../../shared";
import {  useViewerFeatures, useViewerFeaturesAction } from "../../model";


const ProfileModal = () => {
  const { modalActive, newName, buttonTextModal, activeFoto, titleModal } = useViewerFeatures()
  const { toggle, closeModal } = useViewerFeaturesAction()
  const {  fetchDeleteViewer, fetchUpdateViewer } = useViewerAction()

  const { viewer, authId } = useViewer()
  const {  navigate } = useRouterNavigation()

  const modalSubmit = async () => {
    if (!viewer || !authId) return;
    toggle()

    if (buttonTextModal === 'Delete') {
      fetchDeleteViewer(authId)
      navigate('push', "/")
    } else {

      fetchUpdateViewer({
        fullName: newName ? newName : viewer.fullName,
        id: authId,
        imag: activeFoto ? activeFoto : '',
        prevImag: viewer.image.public_id,
      })
      
  };
}

  return (
    <ModalRG
        active={modalActive}
        handleClose={toggle}
        footer={{ submitText: buttonTextModal, cancelText: "Cancel" }}
        handleCancel={closeModal}
        submitModal={modalSubmit}
        title={titleModal}
        width={400}
      ></ModalRG>
  );
};

export { ProfileModal };