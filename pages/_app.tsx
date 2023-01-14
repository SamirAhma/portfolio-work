import { AppProps } from "next/app";
import "../styles/index.css";
import { Waiter } from "react-wait";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Waiter>
      <Component {...pageProps} />
    </Waiter>
  );
}
