import BlogOverview from "@/components/blog-overveiw";
import { BlogProvider } from "@/context/BlogContext";
import React from "react";

async function fetchBlogs() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blogs", {
      method: "GET",
      cache: "no-cache",
    });
    const result = await apiResponse.json();
    return result?.data;
  } catch (e) {
    throw new Error(e);
  }
}

const Blogs = async () => {
  const blogList = await fetchBlogs();
  console.log(blogList);
  return (
    <div>
      <BlogProvider>
        <BlogOverview blogList={blogList} />
      </BlogProvider>
    </div>
  );
};

export default Blogs;
