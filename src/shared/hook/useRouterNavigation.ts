import { useRouter  } from "next/router";

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
    options: NavigationOptions = {}
  ) => {
    router[method](href, undefined, options);
  };


  return {  
    pathname: router.pathname,
    query: router.query,
    navigate
  }
}



/**
 * react-router-dom
  
import { useHistory } from 'react-router-dom';

type NavigationMethod = 'push' | 'replace' | 'goBack' | 'goForward';

interface NavigationOptions {
  state?: any;
}

export const useNavigation = () => {
  const history = useHistory();

  const navigate = (
    method: NavigationMethod = 'push',
    path: string,
    options: NavigationOptions = {}
  ) => {
    const { state } = options;
    switch (method) {
      case 'push':
        history.push(path, state);
        break;
      case 'replace':
        history.replace(path, state);
        break;
      case 'goBack':
        history.goBack();
        break;
      case 'goForward':
        history.goForward();
        break;
      default:
        throw new Error(`Invalid navigation method: ${method}`);
    }
  };

  return {
    location: history.location,
    navigate,
  };
};

 */
