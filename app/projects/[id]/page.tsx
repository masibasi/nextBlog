// 프로젝트 상세 페이지
import { getMainProjects, getOtherProjects } from "../../../utils/notion";
import Link from "next/link";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  // 두 데이터베이스에서 모두 검색
  const mainProjects = await getMainProjects();
  const otherProjects = await getOtherProjects();
  const allProjects = [...mainProjects, ...otherProjects];
  const project = allProjects.find(p => p.id === params.id);

  if (!project) {
    return <div className="max-w-2xl mx-auto py-8 px-4">프로젝트를 찾을 수 없습니다.</div>;
  }

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <div className="mb-2 text-gray-600">기간: {project.duration}</div>
      <div className="mb-2">스택: {project.stacks.join(", ")}</div>
      <div className="mb-2">타입: {project.type}</div>
      <div className="mb-2">Releasable: {project.releasable ? "✅" : "❌"}</div>
      {project.github && (
        <div className="mb-2">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Github</a>
        </div>
      )}
      <Link href="/projects" className="text-sm text-gray-500 hover:underline">← 프로젝트 목록으로</Link>
    </main>
  );
}
