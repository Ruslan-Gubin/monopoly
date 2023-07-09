import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {  persist, store,  } from "@/app";
import '../app/styles/globals.scss';


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist} loading={null}>
          <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};



