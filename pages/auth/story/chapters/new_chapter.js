import React from "react";
import Layout from "../../../../components/Layout";
import cookie from "cookie";
const NewChapter = () => {
  return (
    <Layout>
      <h1>Add new chapter to story</h1>
    </Layout>
  );
};

export default NewChapter;

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
