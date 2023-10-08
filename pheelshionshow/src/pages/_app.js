// pages/_app.js

import "@/styles/globals.css"; // Global styles
import Header from "@/components/Header"; // Global header component
// pages/_app.js
import { Hahmlet } from "next/font/google"; // 해당 폰트의 함수를 사용합니다.

const hahmlet = Hahmlet({ preload: false, weight: ["300", "600"] }); // 변수를 선언하고, 함수의 인자로 스타일을 지정합니다.

function MyApp({ Component, pageProps }) {
  return (
    <main className={hahmlet.className}>
      {" "}
      {/* className을 통해 하위 컴포넌트에서 폰트를 사용합니다. */}
      <Header />
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
