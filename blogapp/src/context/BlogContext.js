"use client";
import React, { createContext, useState } from "react";

//1) Creating the context
export const BlogContext = createContext();

//2) Create a provider component
export const BlogProvider = ({ children }) => {
  const [currentBlogId, setCurrentBlogId] = useState(null);

  return (
    <BlogContext.Provider value={{ currentBlogId, setCurrentBlogId }}>
      {children}
    </BlogContext.Provider>
  );
};
