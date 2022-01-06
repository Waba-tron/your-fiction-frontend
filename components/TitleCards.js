import React from "react";
import { useRouter } from "next/router";
const TitleCards = ({ title }) => {
  const router = useRouter();
  const toTitle = (e) => {
    router.push(`/stories/${title.id}`);
  };

  return (
    <div
      className="text-center shadow-sm p-10 border-l-2 border-white truncate px-6 py-4 mx-auto w-60 bg-blue-600 text-white font-medium rounded-lg cursor-pointer transition delay-150 duration-300 ease-in-out transform hover:scale-110"
      onClick={toTitle}
    >
      <p className=" text-base overflow-ellipsis overflow-hidden ...">
        {title.Title}
      </p>
    </div>
  );
};

export default TitleCards;
