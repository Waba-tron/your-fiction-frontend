import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const { register, error } = useContext(AuthContext);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => error && toast.error(error), [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      toast.error("Password dosent match");
    } else {
      register({ username, email, password });
    }
  };
  return (
    <Layout>
      <div className="min-m-screen antialiased px-4 py-6 flex flex-col justify-center sm:py-12 font-press-start">
        <div className="relative py-1 mx-auto text-center">
          <span className="text-2xl font-light">Register to your account</span>
          <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left max-w-max">
            <div className="h-2 bg-blue-600 rounded-t-md"></div>
            <div className="py-6 px-8">
              <ToastContainer />
              <form onSubmit={handleSubmit}>
                <label className="block font-semibold">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
                  required
                />
                <label className="block mt-3 font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
                  required
                />
                <label className="block mt-3 font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
                  required
                />

                <label className="block mt-3 font-semibold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
                  required
                />

                <button
                  type="submit"
                  className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg w-full hover:bg-blue-800"
                >
                  Register
                </button>
              </form>

              <div className="text-center mt-4">
                <Link href="/auth/login">
                  <a className="text-sm hover:underline text-center">
                    Already have an account
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
