// 프로젝트 목록을 보여주는 페이지
import ProjectList from "../../components/project-list";
import { getMainProjects, getOtherProjects } from "../../utils/notion";

export default async function ProjectsPage() {
  const mainProjects = await getMainProjects();
  const otherProjects = await getOtherProjects();
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Main Projects</h2>
        <ProjectList projects={mainProjects} />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Other Projects</h2>
        <ProjectList projects={otherProjects} />
      </section>
    </main>
  );
}
