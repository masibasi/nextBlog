// Shared Notion block renderer — used by project pages and posts.
import React from "react";
import { ScrollReveal } from "./home/scroll-reveal";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

export type Block = { type: string; id: string; [key: string]: any };
type BlockGroup =
  | { type: "bulleted_list"; items: Block[] }
  | { type: "numbered_list"; items: Block[] }
  | { type: "to_do_list"; items: Block[] }
  | Block;

function groupBlocks(blocks: Block[]): BlockGroup[] {
  const groups: BlockGroup[] = [];
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    if (block.type === "bulleted_list_item") {
      const items: Block[] = [];
      while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
        items.push(blocks[i]);
        i++;
      }
      groups.push({ type: "bulleted_list", items });
    } else if (block.type === "numbered_list_item") {
      const items: Block[] = [];
      while (i < blocks.length && blocks[i].type === "numbered_list_item") {
        items.push(blocks[i]);
        i++;
      }
      groups.push({ type: "numbered_list", items });
    } else if (block.type === "to_do") {
      const items: Block[] = [];
      while (i < blocks.length && blocks[i].type === "to_do") {
        items.push(blocks[i]);
        i++;
      }
      groups.push({ type: "to_do_list", items });
    } else {
      groups.push(block);
      i++;
    }
  }
  return groups;
}

function plainTextOf(richText: any[]): string {
  return (richText ?? []).map((t: any) => t.plain_text).join("");
}

function renderRichText(richText: any[]): React.ReactNode {
  return (richText ?? []).map((t: any, i: number) => {
    let node: React.ReactNode = t.plain_text;
    const ann = t.annotations ?? {};
    if (ann.code) {
      node = (
        <code key={`c${i}`} className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm font-mono">
          {node}
        </code>
      );
    } else {
      if (ann.bold) node = <strong key={`b${i}`}>{node}</strong>;
      if (ann.italic) node = <em key={`e${i}`}>{node}</em>;
      if (ann.underline) node = <u key={`u${i}`}>{node}</u>;
      if (ann.strikethrough) node = <s key={`s${i}`}>{node}</s>;
    }
    if (t.href) {
      return (
        <a key={i} href={t.href} target="_blank" rel="noopener noreferrer" className="underline text-blue-600 dark:text-blue-400 hover:opacity-75 transition-opacity">
          {node}
        </a>
      );
    }
    return <React.Fragment key={i}>{node}</React.Fragment>;
  });
}

function YoutubeEmbed({ id, blockId }: { id: string; blockId: string }) {
  return (
    <div key={blockId} className="my-6 w-full aspect-video overflow-hidden rounded-xl">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}

function renderBlock(block: Block) {
  switch (block.type) {
    case "paragraph": {
      const plain = plainTextOf(block.paragraph.rich_text);
      const ytId = getYouTubeId(plain.trim());
      if (ytId) return <YoutubeEmbed key={block.id} id={ytId} blockId={block.id} />;
      if (!plain) return null;
      return (
        <p key={block.id} className="my-3 text-neutral-800 dark:text-neutral-200 leading-relaxed break-words">
          {renderRichText(block.paragraph.rich_text)}
        </p>
      );
    }
    case "heading_1":
      return (
        <h2 key={block.id} className="text-2xl font-bold mt-8 mb-3 text-neutral-900 dark:text-neutral-100">
          {renderRichText(block.heading_1.rich_text)}
        </h2>
      );
    case "heading_2":
      return (
        <h3 key={block.id} className="text-lg font-semibold mt-6 mb-2 text-neutral-900 dark:text-neutral-100">
          {renderRichText(block.heading_2.rich_text)}
        </h3>
      );
    case "heading_3":
      return (
        <h4 key={block.id} className="text-base font-semibold mt-4 mb-1 text-neutral-800 dark:text-neutral-200">
          {renderRichText(block.heading_3.rich_text)}
        </h4>
      );
    case "quote":
      return (
        <blockquote key={block.id} className="my-4 pl-4 border-l-4 border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 italic leading-relaxed">
          {renderRichText(block.quote.rich_text)}
        </blockquote>
      );
    case "callout": {
      const icon = block.callout.icon?.emoji ?? "💡";
      return (
        <div key={block.id} className="my-4 flex gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
          <span className="text-lg shrink-0 leading-relaxed">{icon}</span>
          <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {renderRichText(block.callout.rich_text)}
          </div>
        </div>
      );
    }
    case "image": {
      // external URL은 영구, file URL은 만료됨 → 프록시 사용
      const url =
        block.image.type === "external"
          ? block.image.external.url
          : `/api/notion-image?blockId=${block.id}`;
      const captionPlain = plainTextOf(block.image.caption ?? []);
      return (
        <figure key={block.id} className="my-6">
          <img src={url} alt={captionPlain || "image"} className="rounded-xl w-full object-cover" />
          {captionPlain && (
            <figcaption className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400">
              {renderRichText(block.image.caption)}
            </figcaption>
          )}
        </figure>
      );
    }
    case "video": {
      const url =
        block.video.type === "external" ? block.video.external?.url : null;
      if (!url) return null;
      const ytId = getYouTubeId(url);
      if (ytId) return <YoutubeEmbed key={block.id} id={ytId} blockId={block.id} />;
      return null;
    }
    case "bookmark":
    case "embed": {
      const url = block[block.type]?.url;
      if (!url) return null;
      const ytId = getYouTubeId(url);
      if (ytId) return <YoutubeEmbed key={block.id} id={ytId} blockId={block.id} />;
      return (
        <div key={block.id} className="my-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-warm flex items-center gap-2 px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300 break-all hover:underline"
          >
            {url}
          </a>
        </div>
      );
    }
    case "divider":
      return <hr key={block.id} className="my-6 border-neutral-200 dark:border-neutral-700" />;
    case "code": {
      const lang = block.code.language ?? "";
      return (
        <div key={block.id} className="my-4">
          {lang && (
            <div className="px-4 pt-2.5 pb-1 rounded-t-xl bg-neutral-200 dark:bg-neutral-700 text-xs font-mono text-neutral-500 dark:text-neutral-400 border border-b-0 border-neutral-200 dark:border-neutral-700">
              {lang}
            </div>
          )}
          <pre className={`p-4 ${lang ? "rounded-b-xl" : "rounded-xl"} bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm overflow-x-auto max-w-full text-neutral-800 dark:text-neutral-200`}>
            <code>{plainTextOf(block.code.rich_text)}</code>
          </pre>
        </div>
      );
    }
    default:
      return null;
  }
}

const NOTION_VERSION = "2022-06-28";

/** Fetch all top-level blocks of a page (paginated — Notion returns max 100 per call). */
export async function fetchBlocks(pageId: string, revalidate = 60): Promise<Block[]> {
  const blocks: Block[] = [];
  let cursor: string | undefined;
  try {
    do {
      const qs = new URLSearchParams({ page_size: "100" });
      if (cursor) qs.set("start_cursor", cursor);
      const res = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children?${qs}`, {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": NOTION_VERSION,
        },
        next: { revalidate },
      });
      if (!res.ok) break;
      const data = await res.json();
      blocks.push(...(data.results ?? []));
      cursor = data.has_more ? data.next_cursor ?? undefined : undefined;
    } while (cursor);
  } catch {
    // ignore — render whatever we got
  }
  return blocks;
}

function PlainWrap({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

/** Render Notion blocks. `reveal` wraps each group in a scroll-reveal animation. */
export function NotionBlocks({ blocks, reveal = false }: { blocks: Block[]; reveal?: boolean }) {
  const grouped = groupBlocks(blocks);
  const Wrap = reveal ? ScrollReveal : PlainWrap;

  return (
    <>
    {grouped.map((group, i) => {
      if (group.type === "bulleted_list") {
        return (
          <Wrap key={`g${i}`}>
            <ul className="my-3 space-y-1 pl-4">
              {group.items.map((item) => (
                <li key={item.id} className="flex gap-2 text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                  <span>{renderRichText(item.bulleted_list_item.rich_text)}</span>
                </li>
              ))}
            </ul>
          </Wrap>
        );
      }
      if (group.type === "numbered_list") {
        return (
          <Wrap key={`g${i}`}>
            <ol className="my-3 space-y-1 pl-5 list-decimal">
              {group.items.map((item) => (
                <li key={item.id} className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {renderRichText(item.numbered_list_item.rich_text)}
                </li>
              ))}
            </ol>
          </Wrap>
        );
      }
      if (group.type === "to_do_list") {
        return (
          <Wrap key={`g${i}`}>
            <ul className="my-3 space-y-1.5">
              {group.items.map((item) => (
                <li key={item.id} className="flex gap-2.5 items-start text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  <span className={`mt-0.5 h-4 w-4 shrink-0 rounded border flex items-center justify-center ${item.to_do.checked ? "bg-neutral-800 dark:bg-neutral-200 border-neutral-800 dark:border-neutral-200" : "border-neutral-300 dark:border-neutral-600"}`}>
                    {item.to_do.checked && (
                      <svg className="h-2.5 w-2.5 text-white dark:text-neutral-800" fill="none" viewBox="0 0 10 10">
                        <path d="M1.5 5l2.5 2.5 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className={item.to_do.checked ? "line-through text-neutral-400 dark:text-neutral-500" : ""}>
                    {renderRichText(item.to_do.rich_text)}
                  </span>
                </li>
              ))}
            </ul>
          </Wrap>
        );
      }
      const rendered = renderBlock(group as Block);
      if (!rendered) return null;
      return <Wrap key={`g${i}`}>{rendered}</Wrap>;
    })}
    </>
  );
}
