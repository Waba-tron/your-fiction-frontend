import React from "react";
import Layout from "../../../components/Layout";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";
import { useEffect } from "react";
import router from "next/router";
import cookie from "cookie";
import Link from "next/link";
const Settings = ({ token }) => {
  const { user, error } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      // router.push("/auth/login");
    }
  }, []);

  return (
    <Layout>
      {user ? (
        <div className=" bg-gray-100 flex h-screen ">
          <div className=" bg-white m-auto w-1/2">
            <div className="h-2 bg-blue-600 rounded-t-md"></div>
            <div className=" p-5">
              <h1 className=" text-4xl mb-4">My Account settings</h1>
              <label className="">Username</label>

              <input
                type="email"
                placeholder="Email"
                value={user.username}
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
                required
              />
              <label className="mt-7">Email</label>

              <input
                type="email"
                placeholder="Email"
                value={user.email}
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
                required
              />
              <div></div>

              <button
                onClick={() => router.push("/story/newstory")}
                className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-800"
              >
                Create Story
              </button>
              <button
                onClick={() => router.push("/auth/story/storytablist")}
                className="m-4 border-blue-600 py-2 px-6 rounded-lg hover:bg-blue-800 border-transparent border-2 hover:border-current hover:text-white"
              >
                Manage Stories
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default Settings;

export async function getServerSideProps({ req, res }) {
  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);

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
