import React from "react";
import { useStore } from "@nanostores/react";
import { postsArray, filteredPosts } from "../store/posts";
import PostCard from "./PostCard";

const ShowPosts = () => {
  const postsStore = useStore(postsArray);
  const filteredPostsStore = useStore(filteredPosts);
  return (
    <>
      {filteredPosts.get().length > 0 && (
        <div>
          <h1>Filtered Posts</h1>
          <ul>
            {filteredPosts.get().length > 0 &&
              filteredPosts.get().map((post, idx) => (
                <li key={idx}>
                  <PostCard
                    title={post.title}
                    author={post.author}
                    category={post.category}
                    date={post.date}
                    description={post.description}
                    slug={post.slug}
                  />
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ShowPosts;
