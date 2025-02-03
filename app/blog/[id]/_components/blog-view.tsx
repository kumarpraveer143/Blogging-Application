"use client";

import { Blogs } from "@prisma/client";
import EditorJS from "@editorjs/editorjs";
import * as React from "react";
import { DEFAULT_MAX_VERSION } from "tls";

interface Props {
  blog: Blogs;
}

const BlogView = ({ blog }: Props) => {
  const editorRef: React.MutableRefObject<EditorJS | null> =
    React.useRef<EditorJS>(null);

  React.useEffect(() => {
    if (editorRef.current) return;

    const editor = new EditorJS({
      holder: "editorjs",
      readOnly: true,
      data: {
        blocks: JSON.parse(blog.blocks),
      },
    });

    editorRef.current = editor;
  }, []);

  return (
    <div className="mt-5">
      <div id="editorjs" />
    </div>
  );
};

export default BlogView;
