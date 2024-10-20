import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDB();
    // URL is a api which parses the url(req.url) and returns a pathname and searchParams
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("id");
    if (!blogId) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }
    // Find and delete the blog by its ID
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (deletedBlog) {
      return NextResponse.json({
        success: true,
        message: "Blog deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Blog not found",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
