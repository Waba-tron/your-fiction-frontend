import React from "react";
import Link from "next/link";
const MenuType = ({ icon, type }) => {
  return (
    <Link href={`storytype/${type}`}>
      <div className=" bg-blue-600 shadow-sm p-10 flex flex-col text-center text-white items-center text-2xl cursor-pointer transition delay-150 duration-300 ease-in-out transform hover:scale-110">
        {icon}
        <h1 className=" mt-4">{type}</h1>
      </div>
    </Link>
  );
};

export default MenuType;
