import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import moment from "moment";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email)
    return redirect("/signin");

  const blogs = await prisma.blogs.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="px-2">
      <div className="mt-10 flex items-center justify-between"></div>
      <div className="">
        <div className="mt-5">
          {blogs.map((blog) => {
            return (
              <div key={blog.id}>
                <div className="bg-muted p-6 rounded-lg mt-4">
                  <Link href={`/blog/${blog.id}`}>
                    <div className="bg-muted p-2 rounded-lg">
                      <h4 className="text-xl">{blog.title}</h4>
                      <div className="flex items-center justify-between mt-10">
                        <div className="gap-2 text-sm text-muted-foreground flex items-center">
                          <div>
                            {blog.imageURL && (
                              <Image
                                className="rounded-full"
                                src={blog.imageURL}
                                height={30}
                                width={30}
                                alt="user_img"
                              ></Image>
                            )}
                          </div>
                          <div>
                            <p>{blog.name}</p>
                            <p>{blog.email}</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mt-2 text-right">
                          {moment(blog.createdAt).format("ll")}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
