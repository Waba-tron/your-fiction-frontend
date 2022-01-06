import React from "react";

const Test = ({ category }) => {
  return <div>{console.log(category)}</div>;
};

export default Test;

export async function getStaticProps() {
  const res = await fetch(`http://localhost:1337/stories`);

  const category = await res.json();

  return {
    props: { category },
  };
}
