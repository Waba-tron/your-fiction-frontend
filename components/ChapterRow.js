import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
const ChapterRow = ({ chapter }) => {
  return (
    <tr className="odd:bg-green even:bg-gray-100">
      <td className="w-2/12">{chapter.ChapterNumber}</td>
      <td className="w-9/12">{chapter.ChapterTitle}</td>
      <td className="w-1/12">
        <button className="bg-blue-600 shadow-sm p-2 flex flex-col text-center text-white items-center text-2xl cursor-pointer">
          <BsPencilSquare />
        </button>
      </td>
      <td className="w-1/12">
        <button className="bg-blue-600 shadow-sm p-2 flex flex-col text-center text-white items-center text-2xl cursor-pointer">
          <AiOutlineDelete />
        </button>
      </td>
    </tr>
  );
};

export default ChapterRow;
