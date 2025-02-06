"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import EditorJS, { OutputData } from "@editorjs/editorjs";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBlog } from "../action";

const formSchema = z.object({
  title: z.string().min(3).max(50),
});

type FormSchemaValues = z.infer<typeof formSchema>;

const CreateBlogForm = () => {
  const router = useRouter();

  const form = useForm<FormSchemaValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const editorRef = React.useRef<EditorJS | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      import("@editorjs/editorjs").then((EditorJS) => {
        if (editorRef.current) return;

        const editor = new EditorJS.default({
          holder: "editorjs",
        });

        editorRef.current = editor;
      });
    }
  }, []);

  async function onSubmit(values: FormSchemaValues) {
    const { title } = values;
    const outputFromEditor: OutputData | undefined =
      await editorRef.current?.save();

    await createBlog({
      blocks: JSON.stringify(outputFromEditor?.blocks),
      title,
    });

    router.push("/admin");
  }

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Type here..." {...field} />
                </FormControl>
                <FormDescription>This is your title for blog</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-muted rounded-lg p-2">
            <div id="editorjs" />
          </div>

          <Button>Save</Button>
        </form>
      </Form>
    </main>
  );
};

export default CreateBlogForm;
