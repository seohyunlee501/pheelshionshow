import { Html, Head, Main, NextScript } from "next/document";
import Header from "@/components/Header"; // Global header component

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>필션쇼 롤링페이퍼</title>
        <link href="../star.png" rel="shortcut icon" type="image/x-icon"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
