'use client'

import { useRouter } from "next/router";


type NavigationMethod = 'push' | 'replace' | 'back' | 'forward';

interface NavigationOptions {
  shallow?: boolean;
  locale?: string | false;
}

export const useRouterNavigation = () => {
  const router = useRouter()


  const navigate = (
    method: NavigationMethod = 'push',
    href: string,
  ) => {
    router[method](href, undefined);
  };

  const navigateDinamicId = (template: string, id: string) => {
    router.push(`${template}[id]`, `${template}${id}`)
  }



  return {  
    pathname: router.pathname,
    query: router.query,
    navigateDinamicId,
    navigate,
  }
}
