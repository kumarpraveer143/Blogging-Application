import { z } from "zod";
import CreateBlogForm from "./_components/create_blog";

const formSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(25),
});

type FormmSchemaValues = z.infer<typeof formSchema>;

export default function CreateBlog() {
  return (
    <>
      <main className="mt-10">
        <CreateBlogForm />
      </main>
    </>
  );
}
