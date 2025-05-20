import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section className="flex flex-col items-center">
      <div className="w-full bg-yellow-200 text-yellow-900 text-center py-2 text-sm font-semibold mb-4 rounded">🚧 This blog is under construction! Some features may change or be incomplete. 🚧</div>
      <div className="flex flex-row items-center w-full max-w-2xl mb-4 justify-between">
        <h1 className="text-2xl font-semibold tracking-tighter">Jimin's Dev Blog</h1>
        <img src="/me.png" alt="Ji Min Lee" width={160} height={160} className="shadow-lg" style={{ objectFit: "cover", borderRadius: "8px" }} />
      </div>
      <div className="w-full max-w-2xl mb-8">
        <p className="text-left">
          Hi, I'm Ji Min Lee — a developer passionate about building human-centered technologies, clean code, and meaningful products.
          <br />
          <br />
          I'll be joining the MS in Computer Science program at USC this August, after working as a full-stack engineer in Korea.
          <br />
          <br />
          Outside of coding, I'm enjoying capturing moments with my film camera 📸learning electric guitar🎸, love dancing, and enjoy both basketball and football (a loyal Tottenham fan ⚽). I'm also
          a longtime T1 supporter in League of Legends 🎮 — and above all, I deeply love animals.
          <br />
          <br />
          This blog is a place for me to reflect, share what I learn, and document my journey as a developer and a person. Thanks for stopping by!
        </p>
      </div>
      <div className="my-8 w-full">
        <BlogPosts />
      </div>
    </section>
  );
}
