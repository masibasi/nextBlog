// 프로젝트 상세 페이지
import { getMainProjects, getOtherProjects } from "../../../utils/notion";
import Link from "next/link";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  // 두 데이터베이스에서 모두 검색
  const mainProjects = await getMainProjects();
  const otherProjects = await getOtherProjects();
  const allProjects = [...mainProjects, ...otherProjects];
  const project = allProjects.find((p) => p.id === params.id);

  // Notion 본문 블록 fetch
  let blocks: any[] = [];
  if (project) {
    try {
      const res = await fetch(`https://api.notion.com/v1/blocks/${project.id}/children`, {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
        },
      });
      if (res.ok) {
        const data = await res.json();
        blocks = data.results;
      }
    } catch (e) {
      // ignore
    }
  }

  if (!project) {
    return <div className="max-w-2xl mx-auto py-8 px-4">Could not load data</div>;
  }

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      {project.cover && <img src={project.cover} alt="cover" className="w-full h-64 object-cover rounded-lg mb-6" />}
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <div className="mb-2 text-gray-600">Date: {project.duration}</div>
      <div className="mb-2 flex flex-wrap gap-2 items-center">
        <span className="font-semibold">Stacks:</span>
        {project.stacks.map((stack: string) => (
          <span
            key={stack}
            className="px-2 py-1 rounded border text-xs font-medium"
            style={{
              borderColor: getStackColor(stack),
              color: getStackColor(stack),
            }}
          >
            {stack}
          </span>
        ))}
      </div>
      {/* tags 필드 렌더링 */}
      {project.tags && project.tags.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2 items-center">
          <span className="font-semibold">Tags:</span>
          {project.tags.map((tag: string) => (
            <span key={tag} className="px-2 py-1 rounded border text-xs font-medium border-gray-400 text-gray-700 dark:text-gray-200">
              {tag}
            </span>
          ))}
        </div>
      )}
      {project.github && (
        <div className="mb-2">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Github
          </a>
        </div>
      )}
      {project.notionUrl && (
        <div className="mb-4">
          <a href={project.notionUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-600 hover:underline">
            View original page in Notion
          </a>
        </div>
      )}

      {/* Notion 본문 블록(heading, list, image, YouTube embed 등 지원) */}
      {blocks.length > 0 && (
        <div className="prose dark:prose-invert my-8">
          {blocks.map((block) => {
            if (block.type === "paragraph") {
              return <p key={block.id}>{block.paragraph.rich_text.map((t: any) => t.plain_text).join("")}</p>;
            }
            if (block.type === "heading_1") {
              return <h1 key={block.id}>{block.heading_1.rich_text.map((t: any) => t.plain_text).join("")}</h1>;
            }
            if (block.type === "heading_2") {
              return <h2 key={block.id}>{block.heading_2.rich_text.map((t: any) => t.plain_text).join("")}</h2>;
            }
            if (block.type === "heading_3") {
              return <h3 key={block.id}>{block.heading_3.rich_text.map((t: any) => t.plain_text).join("")}</h3>;
            }
            if (block.type === "bulleted_list_item") {
              return <li key={block.id}>{block.bulleted_list_item.rich_text.map((t: any) => t.plain_text).join("")}</li>;
            }
            if (block.type === "numbered_list_item") {
              return <li key={block.id}>{block.numbered_list_item.rich_text.map((t: any) => t.plain_text).join("")}</li>;
            }
            if (block.type === "image") {
              const url = block.image.type === "external" ? block.image.external.url : block.image.file.url;
              return <img key={block.id} src={url} alt="notion-img" className="my-4 rounded" />;
            }
            // YouTube 링크가 있는 bookmark/embed 블록을 iframe으로 렌더링
            if ((block.type === "bookmark" || block.type === "embed") && block[block.type]?.url) {
              const url = block[block.type].url;
              const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
              if (ytMatch) {
                const videoId = ytMatch[1];
                return (
                  <div key={block.id} className="my-6">
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full aspect-video rounded"
                    ></iframe>
                  </div>
                );
              } else {
                // 일반 북마크는 링크로 표시
                return (
                  <div key={block.id} className="my-4">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
                      {url}
                    </a>
                  </div>
                );
              }
            }
            // 필요시 더 다양한 블록 지원 가능
            return null;
          })}
        </div>
      )}

      <Link href="/projects" className="text-sm text-gray-500 hover:underline">
        ← Back to project list
      </Link>
    </main>
  );
}

// 스택별 색상 반환 함수
function getStackColor(stack: string) {
  const colors: Record<string, string> = {
    React: "#61dafb",
    "React-native": "#61dafb",
    Javascript: "#f7df1e",
    Typescript: "#3178c6",
    Python: "#3776ab",
    JAVA: "#e76f00",
    Docker: "#2496ed",
    Spring: "#6db33f",
    MySQL: "#00758f",
    Oracle: "#f80000",
    Druid: "#1a1a1a",
    Kafka: "#231f20",
    HuggingFace: "#ffcd00",
    Team: "#888",
    Android: "#3ddc84",
    개인: "#888",
    Superset: "#e1574f",
  };
  return colors[stack] || "#888";
}
