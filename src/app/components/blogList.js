import Loading from "@/app/loading";
import Link from "next/link";
import { Suspense } from "react";

const getBlogData = async (waitTime) => {
  await new Promise((resolve) => setTimeout(resolve, waitTime));

  const res = await fetch("http://localhost:3000/api/blog");

  const blogData = await res.json();

  return blogData;
};

const BlogList = async ({ waitTime }) => {
  const blogData = await getBlogData(waitTime);
  console.log(blogData);

  return (
    <div className="container mx-auto py-[50px]">
      <div className="grid grid-cols-12 gap-3">
        {blogData.map((blog) => (
          <div
            className="col-span-4 border border-black rounded p-5"
            key={blog.id}
          >
            <Link href={`/blog/${blog.id}`} className="w-full">
              <h2>{blog.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
