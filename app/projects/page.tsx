import ProjectList from "../../components/project-list";
import { getMainProjects, getOtherProjects, type Project } from "../../utils/notion";

export const revalidate = 3600;

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    const [main, other] = await Promise.all([getMainProjects(), getOtherProjects()]);
    projects = [...main, ...other];
  } catch (e) {
    console.error("projects fetch error", e);
  }
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="font-serif text-3xl tracking-[-0.02em] text-neutral-900 dark:text-neutral-50 mb-2">Projects</h1>
      <p className="text-[14px] text-neutral-500 dark:text-neutral-400 mb-10">Things I&apos;ve built — research tools, full-stack apps, and AI systems.</p>
      <ProjectList projects={projects} />
    </main>
  );
}
