import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all blogs from the database using lean for performance optimization
    const blogs = await Blog.find({}).lean();

    // Check if any blogs were found
    if (!blogs.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No blogs found",
        },
        { status: 404 }
      );
    }

    // Return the blogs if found
    return NextResponse.json(
      {
        success: true,
        message: "Blogs retrieved successfully",
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching blogs:", error);

    // Return a generic error message with a 500 status code
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
