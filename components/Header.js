import React from "react";
import Link from "next/link";
import { BsBook } from "react-icons/bs";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-600 p-3 font-light">
      <div className="flex items-center flex-shrink-0 text-white mr-6 text-4xl">
        <Link href="/">
          <BsBook />
        </Link>

        <span className=" text-xl ml-4">
          Your Fiction | Unleash you imagination
        </span>
      </div>
      {console.log(user)}
      <div className="text-white text-xl">
        <Link href="/">
          <a className="lg:inline-block lg:mt-0 text-teal-200 mr-4">Home</a>
        </Link>

        {user ? (
          <>
            <Link href="/auth/account/settings">
              <a className="lg:inline-block lg:mt-0 text-teal-200 mr-4">
                Account
              </a>
            </Link>
            <button
              className="bg-white text-black font-light px-3 py-1  rounded-md"
              onClick={() => logout()}
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/auth/login">
            <a className="lg:inline-block lg:mt-0 text-teal-200 mr-4">Login</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
