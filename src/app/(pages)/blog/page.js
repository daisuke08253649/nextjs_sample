import BlogList from "@/app/components/blogList";
import Loading from "@/app/loading";
import { Suspense } from "react";

const BlogPage = async () => {
  return (
    <div className="container mx-auto py-[50px]">
      <h2 className="text-[50px] font-bold mb-5">Blog</h2>
      <Suspense fallback={<Loading />}>
        <BlogList waitTime={3000} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <BlogList waitTime={5000} />
      </Suspense>
    </div>
  );
};

export default BlogPage;
