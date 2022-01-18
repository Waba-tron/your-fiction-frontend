import React from "react";
import cookie from "cookie";
import Layout from "../../../../../components/Layout";
const EditChapter = ({ token }) => {
  return <Layout>{token}</Layout>;
};

export default EditChapter;

export async function getServerSideProps({ req }) {
  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);

    if (token) {
      return { props: { token } };
    }
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
