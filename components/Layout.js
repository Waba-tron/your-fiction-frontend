import React from "react";
import Head from "next/head";
import Header from "./Header";
const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>Your Fiction</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/@tailwindcss/custom-forms@0.2.1/dist/custom-forms.css"
          rel="stylesheet"
        />
      </Head>
      <Header />

      <div className="font-press-start">{children}</div>
    </div>
  );
};

export default Layout;
