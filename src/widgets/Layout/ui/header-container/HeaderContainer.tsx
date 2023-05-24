import { LayoutHeaderViewer } from "@/features";
import { Logo, useRouterNext,  } from "@/shared";
import { LayoutHeaderLinkList } from "../header-link-list/LayoutHeaderLinkList";


import styles from './HeaderContainer.module.scss';

const HeaderContainer = () => {
  const { routerPushPage, pathname } = useRouterNext()

  const handleLinkRouter = (patch: string) => {
    if (pathname === patch) return;
    routerPushPage(patch)
   }

  return (
    <header className={styles.root}>
    <div className={styles.link_list}>
  <Logo onClick={handleLinkRouter} />
  <LayoutHeaderLinkList pathname={pathname} handleLink={handleLinkRouter} />
    </div>
     <LayoutHeaderViewer />
  </header>
  );
};

export  { HeaderContainer };