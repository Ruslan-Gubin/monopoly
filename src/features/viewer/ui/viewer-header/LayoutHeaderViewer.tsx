import { useViewer, useViewerAction, ViewerAvatar } from "@/entities";
import { useRouters } from "@/shared";

import styles from './LayoutHeaderViewer.module.scss';

const LayoutHeaderViewer = () => {
  const { viewer, autorization } = useViewer();
  const { routerPushPage, pathname } = useRouters();
  const { clearViewer } = useViewerAction()

  
  const handleRoute = () => {
    const patch = autorization ? "/lk" : "/login";
    if (pathname === patch) return;
    routerPushPage(patch);
  };

  const handleOutUser = () => {
    clearViewer()
    routerPushPage('/')
  }


  return (
    <section className={styles.viewer_header__nav}>
      <>
      {viewer  ? (
        <ViewerAvatar
          title="Личный кабинет"
          image={viewer.image.url ? viewer.image.url : ''}
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