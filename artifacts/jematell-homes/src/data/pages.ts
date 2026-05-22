import pagesJson from "../../../../clone-data/extracted/pages.json";

export type Block = {
  type: string;
  text?: string;
  src?: string;
  alt?: string;
};

export type PageData = {
  sourceUrl: string;
  title: string;
  description: string;
  ogImage: string;
  blocks: Block[];
};

export const pages = pagesJson as Record<string, PageData>;
