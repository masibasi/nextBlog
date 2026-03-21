import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  );
}
