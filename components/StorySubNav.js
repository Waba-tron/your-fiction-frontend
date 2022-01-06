import React from "react";
import Link from "next/link";
const StorySubNav = ({ id }) => {
  return (
    <>
      <div className="h-2 bg-blue-600 rounded-t-md mt-3"></div>
      <nav className=" bg-white p-3">
        <Link href={`/auth/story/story_edit/${id}`}>
          <a className="lg:inline-block lg:mt-0 text-teal-200 mr-4">
            Properties
          </a>
        </Link>
        <Link href={`/auth/story/story_edit_content/${id}`}>
          <a className="lg:inline-block lg:mt-0 text-teal-200 mr-4">Chapters</a>
        </Link>
      </nav>
    </>
  );
};

export default StorySubNav;
