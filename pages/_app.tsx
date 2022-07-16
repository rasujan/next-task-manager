import "../styles/globals.css";
import "../styles/styles.scss";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import store from "store/Store";

import { setupAxios } from "constants/axios-setup";

setupAxios(store);

function MyApp({ Component, pageProps }: AppProps) {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
