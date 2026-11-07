import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE } from "app/lib/admin";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function signIn(formData: FormData) {
  "use server";
  const key = process.env.ADMIN_KEY;
  if (!key || formData.get("password") !== key) redirect("/admin?error=1");
  cookies().set(ADMIN_COOKIE, "1", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  redirect("/admin");
}

async function signOut() {
  "use server";
  cookies().delete(ADMIN_COOKIE);
  redirect("/admin");
}

export default function AdminPage({ searchParams }: { searchParams: { error?: string } }) {
  const signedIn = cookies().get(ADMIN_COOKIE)?.value === "1";
  const postsDb = process.env.NOTION_POSTS_DB_ID;

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-serif text-3xl mb-2 tracking-tight text-neutral-900 dark:text-neutral-100">Admin</h1>

      {signedIn ? (
        <div className="space-y-6">
          <p className="text-neutral-600 dark:text-neutral-400">
            This browser is signed in. Posts now show an Edit in Notion button.
          </p>
          {postsDb && (
            <a
              href={`https://www.notion.so/${postsDb}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-warm block px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200"
            >
              Open the Posts database in Notion ↗
            </a>
          )}
          <form action={signOut}>
            <button className="text-sm text-neutral-500 hover:text-cardinal-700 dark:hover:text-cardinal-400 underline">
              Sign out on this browser
            </button>
          </form>
        </div>
      ) : (
        <form action={signIn} className="space-y-3">
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">Sign in to show edit buttons on posts.</p>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-cardinal-700"
          />
          {searchParams.error && <p className="text-sm text-cardinal-700 dark:text-cardinal-400">Wrong password.</p>}
          <button className="w-full px-3 py-2 rounded-lg bg-cardinal-700 text-white text-sm font-medium hover:bg-cardinal-800 transition-colors">
            Sign in
          </button>
        </form>
      )}
    </div>
  );
}
