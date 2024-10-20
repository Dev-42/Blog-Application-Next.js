import BlogOverview from "@/components/blog-overveiw";
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
      <BlogOverview blogList={blogList} />
    </div>
  );
};

export default Blogs;
