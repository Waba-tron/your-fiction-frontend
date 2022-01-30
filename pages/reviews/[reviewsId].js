import React from "react";
import Layout from "../../components/Layout";
import ReviewCard from "../../components/ReviewCard";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import { API_URL } from "../../config";
const Reviews = ({ data }) => {
  return (
    <Layout>
      <div className="p-5">
        <h1 className="mt-auto mb-auto text-4xl font-medium ">
          Reviews - {data.story.StoryTitle}
        </h1>
        <div>
          {data.story.reviews.map((review) => (
            <ReviewCard review={review} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reviews;

export async function getServerSideProps(context) {
  console.log(context.params);
  const { reviewsId } = context.params;

  const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      {
        story(id: ${reviewsId}) {
          StoryTitle
          id
          reviews {
            id
            ReviewBody
            ChapterNumber
            created_at
            user {
              username
            }
          }
        }
      }
    `,
  });

  return {
    props: { data },
  };
}
