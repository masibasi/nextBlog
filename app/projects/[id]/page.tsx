import React from "react";
import { getAllProjects } from "../../../utils/notion";
import Link from "next/link";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ id: p.id }));
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

type Block = { type: string; id: string; [key: string]: any };
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
    <div key={blockId} className="my-6">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full aspect-video rounded-xl"
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
        <p key={block.id} className="my-3 text-neutral-800 dark:text-neutral-200 leading-relaxed">
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
      const url =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
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

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const allProjects = await getAllProjects();
  const project = allProjects.find((p) => p.id === params.id);

  let blocks: Block[] = [];
  if (project) {
    try {
      const res = await fetch(`https://api.notion.com/v1/blocks/${project.id}/children`, {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
        },
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const data = await res.json();
        blocks = data.results ?? [];
      }
    } catch {
      // ignore
    }
  }

  if (!project) {
    return <div className="max-w-2xl mx-auto py-8 px-4">Could not load data</div>;
  }

  const hasAward = project.tags?.includes("Award");
  const displayTags = (project.tags ?? []).filter((t) => t !== "Award");
  const grouped = groupBlocks(blocks);

  return (
    <main className="max-w-2xl mx-auto py-8 px-4 overflow-x-hidden">
      {/* Breadcrumb */}
      <div className="mb-5 flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 underline underline-offset-2 decoration-neutral-300 dark:decoration-neutral-600 transition-colors"
        >
          ← Projects
        </Link>
        {project.notionUrl && (
          <a
            href={project.notionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-cardinal-700 dark:hover:text-cardinal-400 transition-colors"
          >
            View in Notion ↗
          </a>
        )}
      </div>

      {project.cover && (
        <div className="mb-6">
          <img
            src={project.cover}
            alt="cover"
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-3 flex-wrap mb-2">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {project.title}
          </h1>
          {hasAward && (
            <span className="mt-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
              Award
            </span>
          )}
        </div>

        {project.summary && (
          <p className="text-neutral-500 dark:text-neutral-400 mb-3 leading-relaxed">
            {project.summary}
          </p>
        )}

        {project.duration && (
          <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-3">
            {project.duration}
          </p>
        )}

        {(project.stacks ?? []).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {(project.stacks ?? []).map((stack) => (
              <span
                key={stack}
                className="px-2 py-1 rounded-md border text-xs font-medium bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
              >
                {stack}
              </span>
            ))}
          </div>
        )}

        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {displayTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded border text-xs text-neutral-500 dark:text-neutral-400 border-neutral-300 dark:border-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      {blocks.length > 0 && (
        <div className="my-8">
          {grouped.map((group, i) => {
            if (group.type === "bulleted_list") {
              return (
                <ul key={i} className="my-3 space-y-1 pl-4">
                  {group.items.map((item) => (
                    <li key={item.id} className="flex gap-2 text-neutral-800 dark:text-neutral-200 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                      <span>{renderRichText(item.bulleted_list_item.rich_text)}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            if (group.type === "numbered_list") {
              return (
                <ol key={i} className="my-3 space-y-1 pl-5 list-decimal">
                  {group.items.map((item) => (
                    <li key={item.id} className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
                      {renderRichText(item.numbered_list_item.rich_text)}
                    </li>
                  ))}
                </ol>
              );
            }
            if (group.type === "to_do_list") {
              return (
                <ul key={i} className="my-3 space-y-1.5">
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
              );
            }
            return renderBlock(group as Block);
          })}
        </div>
      )}
    </main>
  );
}
