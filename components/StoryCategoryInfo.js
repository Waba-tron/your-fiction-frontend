import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const StoryCategoryInfo = ({ categorys, formData, setFormData }) => {
  const [chosenCategory, setchosenCategory] = useState({});
  const [Title, setTitle] = useState({});

  const chosenTitle = (title) => {
    setTitle(title);
    toast.success(`${title.Title} chosen, click next`);
    setFormData({ ...formData, title: title.id });
  };

  return (
    <div className="grid md:grid-cols-2">
      <div className=" mr-20  ">
        <h1 className=" text-2xl mb-2">Select Category</h1>
        {categorys &&
          categorys.map((category) => (
            <div
              className=" px-5 py-2 text-sm leading-5 rounded-full  "
              onClick={() => setchosenCategory(category)}
              key={category.id}
            >
              <h1 className="px-5 py-2 text-sm leading-5 rounded-full text-white  bg-blue-600 cursor-pointer  hover:border-green-600    ">
                {category.Type}
              </h1>
            </div>
          ))}
      </div>
      <div className="ml-20 ">
        <h1 className=" text-2xl mb-2">Choose Title</h1>
        {categorys &&
          categorys
            .filter((category) => category.id === chosenCategory.id)
            .map((cat) => (
              <div id={cat.id}>
                {cat.titles.length > 0 ? (
                  cat.titles.map((title) => (
                    <div
                      className="outline-none hover:border-blue-600 border-transparent border-2 hover:border-current  cursor-pointer"
                      id={title.id}
                    >
                      <h1 onClick={() => chosenTitle(title)}>{title.Title}</h1>
                    </div>
                  ))
                ) : (
                  <h1>Current no available titles</h1>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default StoryCategoryInfo;
