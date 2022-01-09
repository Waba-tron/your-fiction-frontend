import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useContext } from "react";
import ReviewContext from "../../context/ReviewContext";

const Create = () => {
  useEffect(() => {}, []);
  const { reviewData } = useContext(ReviewContext);
  return <Layout>{console.log(reviewData)}</Layout>;
};

export default Create;
