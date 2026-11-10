import type { Metadata } from "next";
import { PostsIndex } from "app/components/posts-index";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on building software, studying at USC, and figuring things out.",
};

export default function Page() {
  return <PostsIndex />;
}
