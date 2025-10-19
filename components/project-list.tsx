// 프로젝트 리스트 컴포넌트
import type { Project } from "../utils/notion";

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

export default function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return <div>프로젝트가 없습니다.</div>;
  }
  // releasable 항목만 노출
  const visible = (projects ?? []).filter((p) => p.releasable === true);
  const list = visible.length > 0 ? visible : [];

  if (list.length === 0) {
    return <div>노출할 프로젝트가 없습니다.</div>;
  }

  // duration(날짜) 기준 최신순 정렬 (ISO string 기준)
  const sorted = [...list].sort((a, b) => {
    const da = a?.duration ? new Date(a.duration).getTime() : 0;
    const db = b?.duration ? new Date(b.duration).getTime() : 0;
    return db - da;
  });
  return (
    <ul className="space-y-2">
      {sorted.map((project) => (
        <li key={project.id}>
          <a href={`/projects/${project.id}`} className="font-semibold text-blue-700 dark:text-blue-400 hover:underline">
            {project.title || (project as any).name || "Untitled"}
          </a>
          {project.duration && <span className="ml-2 text-xs text-gray-500">({project.duration})</span>}
          {project.stacks && project.stacks.length > 0 && <span className="ml-2 text-xs text-gray-600">[{project.stacks.join(", ")}]</span>}
        </li>
      ))}
    </ul>
  );
}
