import blogsJson from "../../../../clone-data/extracted/blogs.json";

export type Block = {
  type: string;
  text?: string;
  src?: string;
  alt?: string;
};

export type BlogData = {
  sourceUrl: string;
  title: string;
  description: string;
  ogImage: string;
  blocks: Block[];
};

export const blogs = blogsJson as Record<string, BlogData>;
