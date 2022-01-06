import React from "react";
import Layout from "../../components/Layout";
import ReviewCard from "../../components/ReviewCard";
const Reviews = ({ reviews, StoryTitle }) => {
  return (
    <Layout>
      <div className="p-5">
        <h1 className="mt-auto mb-auto text-4xl font-medium ">
          Reviews - {StoryTitle}
        </h1>
        <div>
          {reviews.map((review) => (
            <ReviewCard review={review} />
          ))}
        </div>
        {console.log(reviews)}
      </div>
    </Layout>
  );
};

export default Reviews;

export async function getServerSideProps(context) {
  console.log(context.params);
  const { reviewsId } = context.params;
  const res = await fetch(`http://localhost:1337/stories/${reviewsId}`);

  const data = await res.json();

  const reviews = data.reviews;
  const StoryTitle = data.StoryTitle;

  return {
    props: { reviews, StoryTitle },
  };
}
