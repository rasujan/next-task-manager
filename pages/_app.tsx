import "../styles/globals.css";
import "../styles/styles.scss";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "store/Store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
