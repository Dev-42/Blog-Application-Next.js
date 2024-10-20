import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DisplayBlogs = ({ blogList }) => {
  const router = useRouter();
  // Delete a blog by it's id
  const handleBlogDelete = async (getCurrentId) => {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentId}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();
      if (result?.success) {
        router.refresh();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
      {blogList && blogList.length > 0 ? (
        blogList.map((blog, index) => (
          <Card
            key={index}
            className="p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardContent>
              <CardTitle className="mb-3 text-lg font-bold text-gray-800">
                {blog?.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {blog?.description}
              </CardDescription>
              <div className="mt-5 flex gap-3">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Edit
                </Button>
                <Button
                  onClick={() => handleBlogDelete(blog._id)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg">
          There are no blogs to display
        </p>
      )}
    </div>
  );
};

export default DisplayBlogs;
