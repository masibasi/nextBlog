// 프로젝트 리스트 컴포넌트
interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return <div>프로젝트가 없습니다.</div>;
  }
  return (
    <ul className="space-y-6">
      {projects.map((project) => (
        <li key={project.id} className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">
            <a href={`/projects/${project.id}`} className="text-blue-600 hover:underline">{project.name}</a>
          </h2>
          {/* <p className="text-gray-700">{project.description}</p> */}
        </li>
      ))}
    </ul>
  );
}
