import { prisma } from "@/db";
import { notFound } from "next/navigation";
import BlogView from "./_components/blog-view";
import Image from "next/image";
import moment from "moment";

export default async function BlogPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const blog = await prisma.blogs.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!blog) return notFound();

  return (
    <main>
      <h3 className="text-2xl mt-8">{blog.title}</h3>
      <p className="text-muted-foreground text-sm mt-2">
        {moment(blog.createdAt).format("ll")}
      </p>
      <div className="mt-3 gap-4 text-sm text-muted-foreground flex items-center">
        <div>
          {blog.imageURL && (
            <Image
              className="rounded-full"
              src={blog.imageURL}
              height={30}
              width={30}
              alt="user_img"
            />
          )}
        </div>
        <div>
          <p>{blog.name}</p>
          <p>{blog.email}</p>
        </div>
      </div>
      <BlogView blog={blog} />
    </main>
  );
}
