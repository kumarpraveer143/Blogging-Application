import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/db";

export default async function AdminPage() {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email)
    return redirect("/signin");

  const blogs = await prisma.blogs.findMany({
    where: {
      email: session.user.email,
    },
  });
  return (
    <main className="px-7">
      <div className="mt-10 flex justify-between">
        <h3>Your Blogs({blogs.length})</h3>
        <Link href="/admin/blog/new">
          <Button>Create Blog</Button>
        </Link>
      </div>
      <div>
        <div className="flex items-center justify-between"></div>
        <div className="">
          <div className="mt-5 ">
            {blogs.map((blog) => (
              <div key={blog.id}>
                <div className="bg-muted p-6 rounded-lg mt-4">
                  <Link href={`/blog/${blog.id}`}>
                    <div className="bg-muted p-2 rounded-lg">
                      <h4 className="text-xl">{blog.title}</h4>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
