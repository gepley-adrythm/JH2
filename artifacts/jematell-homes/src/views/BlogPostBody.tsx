"use client";
import { m, useReducedMotion } from "framer-motion";
import type { Block } from "../data/blogs";

/**
 * BlogPostBody - the scroll-reveal article body of a blog post. The server
 * page passes in only this one post's body blocks (the hero image block is
 * already filtered out), so no other post's content reaches the client.
 * Block-to-element mapping ported verbatim from the old BlogPost page.
 */
export function BlogPostBody({ blocks }: { blocks: Block[] }) {
  const reduce = useReducedMotion();

  return (
    <>
      {blocks.map((b, i) => {
        const anim = reduce
          ? {}
          : {
              initial: { opacity: 0, y: 18 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-60px" },
              transition: { duration: 0.5 },
            };
        if (b.type === "h1" || b.type === "h2") {
          return (
            <m.h2 key={i} className="post-h2" {...anim}>
              {b.text}
            </m.h2>
          );
        }
        if (b.type === "h3" || b.type === "h4") {
          return (
            <m.h3 key={i} className="post-h3" {...anim}>
              {b.text}
            </m.h3>
          );
        }
        if (b.type === "p") {
          return (
            <m.p key={i} className="post-p" {...anim}>
              {b.text}
            </m.p>
          );
        }
        if (b.type === "li") {
          return (
            <m.li key={i} className="post-li" {...anim}>
              {b.text}
            </m.li>
          );
        }
        if (b.type === "blockquote") {
          return (
            <m.blockquote key={i} className="post-quote" {...anim}>
              {b.text}
            </m.blockquote>
          );
        }
        if (b.type === "img" && b.src) {
          return (
            <m.figure key={i} className="post-figure" {...anim}>
              <img src={b.src} alt={b.alt || ""} loading="lazy" />
            </m.figure>
          );
        }
        return null;
      })}
    </>
  );
}
