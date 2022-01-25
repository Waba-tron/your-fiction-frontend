import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const ReviewCard = ({ review }) => {
  const router = useRouter();
  const toStory = (e) => {
    router.push(`/story/${story.id}`);
  };

  return (
    <div className="shadow-sm rounded p-3 border-b-2 bg-white">
      <div className="flex justify-items-end">
        <img
          className=" w-40 h-40 my-auto"
          src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
        />

        <div className=" my-auto">
          <div className="flex gap-2">
            <Link href={`/reviews/f`}>
              <a className=" text-yellow-500">
                {console.log(review)}
                {review.user && review.user.username}
              </a>
            </Link>
            <label className=" text-gray-400">
              Chapter {review.ChapterNumber} -
              {new Date(review.created_at).toLocaleDateString("en-UK")}
            </label>
          </div>

          <p className="text-gray-500  overflow-ellipsis overflow-hidden">
            {review.ReviewBody}
          </p>
          <p className=" text-gray-400">Chapters: f</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
