'use client';
import { FC, memo } from "react";
import Head from "next/head";
import { HeaderContainer } from "../header-container/HeaderContainer";
import { useRouterNavigation } from "@/shared";

import styles from "./Layout.module.scss";

interface IShopLayout {
  children: React.ReactNode;
  title: string;
  keywords: string;
}

const LayoutF: FC<IShopLayout> = ({ children, title, keywords }) => {
  const { pathname } = useRouterNavigation()

  if (!pathname) return null;

  const checkGamePage = /\bgame\b/.test(pathname)

  return (
    <>
      <Head>
        <title>{title ? title : "Home page"}</title>
        <meta name="description" content="It is first project next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          charSet="utf-8"
        />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <HeaderContainer />
        </header>
        <main className={checkGamePage ? `${styles.main} ${styles.game_page}` : styles.main}> {children} </main>
        {/* <footer className={styles.footer}> Footer</footer>  */}
      </div>
    </>
  );
};

export const Layout = memo(LayoutF);
