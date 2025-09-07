// 프로젝트 목록을 보여주는 페이지
import ProjectList from "../../components/project-list";
import { getMainProjects, getOtherProjects } from "../../utils/notion";

export default async function ProjectsPage() {
  let mainProjects = [];
  let otherProjects = [];
  try {
    mainProjects = await getMainProjects();
    console.log("mainProjects", mainProjects);
  } catch (e) {
    console.error("mainProjects fetch error", e);
  }
  try {
    otherProjects = await getOtherProjects();
    console.log("otherProjects", otherProjects);
  } catch (e) {
    console.error("otherProjects fetch error", e);
  }
  return (
    <main className="max-w-2xl mx-auto py-1 px-4">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Main Projects</h2>
        {/* mainProjects가 비어있으면 안내 메시지 */}
        {mainProjects.length === 0 ? <div className="text-red-500 mb-8">Main Projects 데이터를 불러올 수 없습니다.</div> : <ProjectList projects={mainProjects} />}
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Other Projects</h2>
        {otherProjects.length === 0 ? <div className="text-red-500">Other Projects 데이터를 불러올 수 없습니다.</div> : <ProjectList projects={otherProjects} />}
      </section>
    </main>
  );
}
