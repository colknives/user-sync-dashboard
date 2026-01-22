import { supabase } from "@/lib/supabase/server";
import SyncTable from "@/components/sync-table";

export default async function SyncDashboardPage() {
  const { data: users } = await supabase
    .from("users")
    .select("*")
    .order("name");

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        User Synchronization Dashboard
      </h1>

      <SyncTable users={users ?? []} />
    </div>
  );
}
