import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const StoryCard = ({ story }) => {
  const router = useRouter();
  const toStory = (e) => {
    router.push(`/story/${story.id}`);
  };

  return (
    <div className="shadow-sm rounded p-3 border-b-2 bg-white">
      <div className="flex justify-items-end">
        <img
          src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
          width={120}
          height={20}
          className="my-auto"
        />

        <div>
          <div className="flex gap-2">
            <h1 className="font-semibold">{story.StoryTitle}</h1>

            {story.user && (
              <Link href={`/profile/${story.user.id}`}>
                <a className=" text-blue-700"> {story.user.username}</a>
              </Link>
            )}
            <Link href={`/reviews/${story.id}`}>
              <a className=" text-yellow-500">reviews</a>
            </Link>
          </div>

          <p className="text-gray-500 h-12 overflow-ellipsis overflow-hidden">
            {story.summary}
            ...
          </p>
          <p className=" text-gray-400">
            Chapters: {story.chapters.length} Reviews: {story.reviews.length}{" "}
            Published {story.published_at}
          </p>
          <button
            className=" bg-blue-600 mt-0.5 text-white py-1 px-4 rounded-lg hover:bg-blue-800"
            onClick={toStory}
          >
            Read now
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
