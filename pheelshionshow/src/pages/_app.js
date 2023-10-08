// pages/_app.js

import "@/styles/globals.css"; // Global styles
import Header from "@/components/Header"; // Global header component

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
