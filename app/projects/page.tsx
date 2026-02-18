import ProjectList from "../../components/project-list";
import { getAllProjects, type Project } from "../../utils/notion";

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    projects = await getAllProjects();
  } catch (e) {
    console.error("projects fetch error", e);
  }

  const releasable = (projects ?? []).filter((p) => p.releasable);
  const featuredProjects = releasable.filter((p) => p.featured).slice(0, 3);
  const regularProjects = releasable.filter((p) => !p.featured);

  return (
    <main className="page-wrap page-wrap--wide">
      <h1 className="text-3xl font-bold mb-2">Projects</h1>
      <p className="mb-10 text-sm text-neutral-600 dark:text-neutral-400">Selected work from product engineering, applied AI, and research prototypes.</p>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-5">Featured</h2>
        {featuredProjects.length === 0 ? <div className="text-neutral-500">No featured projects yet. In Notion, set <code>featured</code> checkbox = true.</div> : <ProjectList projects={featuredProjects} variant="featured" />}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-5">All Projects</h2>
        {regularProjects.length === 0 ? <div className="text-neutral-500">No additional releasable projects yet.</div> : <ProjectList projects={regularProjects} variant="compact" />}
      </section>
    </main>
  );
}
