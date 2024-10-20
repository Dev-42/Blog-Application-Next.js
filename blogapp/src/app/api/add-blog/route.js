import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import Joi from "joi";

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function POST(req) {
  try {
    // 1) Connect to the database
    await connectToDB();
    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;

    // 2) Validate input data
    const { error } = AddNewBlog.validate({
      title,
      description,
    });
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.details[0].message,
        },
        { status: 400 }
      );
    }

    // 3) Save data to the database
    const newlyCreatedBlogItem = await Blog.create(extractBlogData);
    if (newlyCreatedBlogItem) {
      return NextResponse.json(
        {
          success: true,
          message: "Blog added successfully",
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong! Please try again.",
        },
        { status: 500 }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        success: false,
        message: "Server error! Please try again.",
      },
      { status: 500 }
    );
  }
}
