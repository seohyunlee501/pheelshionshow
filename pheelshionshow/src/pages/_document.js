import { Html, Head, Main, NextScript } from "next/document";
import Header from "@/components/Header"; // Global header component

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Header className="flex fixed top-0 left-0" />
      <body>
        <Main className="bg-scroll pt-100" />
        <NextScript />
      </body>
    </Html>
  );
}
