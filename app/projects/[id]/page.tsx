import React from "react";
import { getAllProjects } from "../../../utils/notion";
import { NotionBlocks, fetchBlocks, type Block } from "../../components/notion-blocks";
import { ProjectPageHeader } from "./project-header";
import { baseUrl } from "../../sitemap";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projects = await getAllProjects();
  const project = projects.find((p) => p.id === id);
  if (!project) return {};

  const title = project.title;
  const description = project.summary ?? `${project.title} — a project by Jimin Lee.`;
  const ogImage = project.cover
    ? project.cover.startsWith("http")
      ? project.cover
      : `${baseUrl}${project.cover}`
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${baseUrl}/projects/${id}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const allProjects = await getAllProjects();
  const project = allProjects.find((p) => p.id === id);

  const blocks: Block[] = project ? await fetchBlocks(project.id, 3600) : [];

  if (!project) {
    return <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-8">Could not load data</div>;
  }

  const hasAward = project.tags?.includes("Award");
  const displayTags = (project.tags ?? []).filter((t) => t !== "Award");

  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-8">
      <div className="max-w-2xl">
      {/* Animated header — client component for staggered mount entrance */}
      <ProjectPageHeader
        project={project}
        hasAward={!!hasAward}
        displayTags={displayTags}
      />

      {/* Body — each block group reveals on scroll */}
      {blocks.length > 0 && (
        <div className="my-8">
          <NotionBlocks blocks={blocks} reveal />
        </div>
      )}
      </div>
    </div>
  );
}
