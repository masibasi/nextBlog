import ProjectList from "../../components/project-list";
import { getMainProjects, getOtherProjects, type Project } from "../../utils/notion";

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    const [main, other] = await Promise.all([getMainProjects(), getOtherProjects()]);
    projects = [...main, ...other];
  } catch (e) {
    console.error("projects fetch error", e);
  }
  return (
    <main className="max-w-2xl mx-auto py-1 px-4">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <ProjectList projects={projects} />
    </main>
  );
}
