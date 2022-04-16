import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/dist/client/link";
import { FaBookReader } from "react-icons/fa";
import cookie from "cookie";
import router from "next/router";
import Modal from "../../components/Modal";
import { StoryProvider } from "../../context/StoryContext";
import CreateStoryForm from "../../components/CreateStoryForm";
const Newstory = ({ token }) => {
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    if (!token) {
      //  router.push("/");
    }
  });
  return (
    <Layout>
      {console.log(token)}
      <div className="p-20 bg-gray-100 h-screen m-auto">
        <div className="h-2 bg-blue-600 rounded-t-md"></div>
        <div className="bg-white grid md:grid-cols-2 h-full ">
          <div className="py-12 px-8 flex flex-col items-center m-auto">
            <h1 className="text-4xl text-center font-light">Create Story</h1>
            <button
              onClick={() => setshowModal(true)}
              className="mt-7  bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-800"
            >
              New Story
            </button>
          </div>

          <div className="bg-blue-600 shadow-sm p-12 flex flex-col text-center text-white items-center text-2xl ">
            <div className="m-auto text-9xl ">
              <FaBookReader />
            </div>
            <h1 className="">
              When you're curious, you find lots of interesting things to do
            </h1>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setshowModal(false)}
        title={"Create your story"}
      >
        <StoryProvider>
          <CreateStoryForm token={token} />
        </StoryProvider>
      </Modal>
    </Layout>
  );
};

export default Newstory;

export async function getServerSideProps({ req, res }) {
  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);
    console.log(token);
    if (!token) {
      return { props: { token: "" } };
    } else {
      return { props: { token: token } };
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
