import { useViewer, useViewerAction, ViewerAvatar } from "@/entities";
import { useRouterNavigation } from "@/shared";

import styles from './LayoutHeaderViewer.module.scss';

const LayoutHeaderViewer = () => {
  const { viewer, autorization } = useViewer();
  const {  pathname, navigate } = useRouterNavigation();
  const { clearViewer } = useViewerAction()

  
  const handleRoute = () => {
    const patch = autorization ? "/lk" : "/login";
    if (pathname === patch) return;
    navigate('push', patch)
  };

  const handleOutUser = () => {
    clearViewer()
    navigate('push', '/')
  }


  return (
    <section className={styles.viewer_header__nav}>
      <>
      {viewer  ? (
        <ViewerAvatar
          title="Личный кабинет"
          size="sm"
          onClick={handleRoute}
        />
      ) : (
        <button onClick={handleRoute} className={styles.logIn_btn}>
          Boйти
        </button>
      )}
    </>
      {autorization &&
      <button title='Выйти' onClick={handleOutUser} className={styles.viewer_out__btn}>Выйти</button>
      }
      </section>
  );
};

export { LayoutHeaderViewer };