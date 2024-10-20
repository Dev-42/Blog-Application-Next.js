"use client";

import React, { useState } from "react";
import AddNewBlog from "../add-new-blog";
import DisplayBlogs from "../get-all-blogs";
import { useRouter } from "next/navigation";

const initialBlogFormData = {
  title: "",
  description: "",
};

const BlogOverview = ({ blogList }) => {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  console.log(blogFormData);

  // Hard refersh automicatically such that blog after adding should appear on the screen
  const router = useRouter();

  async function handleSaveBlogData() {
    try {
      setLoading(true);
      const apiResponse = await fetch("/api/add-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json();
      console.log(result);
      if (result?.success) {
        setOpenBlogDialog(false);
        setBlogFormData(initialBlogFormData);
        setLoading(false);
        router.refresh();
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
      />
      <DisplayBlogs blogList={blogList} />
    </div>
  );
};

export default BlogOverview;
