"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  synced_at: string | null;
};

export default function SyncTable({ users }: { users: User[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function syncUser(userId: string) {
    try {
      setLoadingId(userId);

      const res = await fetch("/api/sync-user", {
        method: "POST",
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("User synced successfully");
      window.location.reload();
    } catch {
      toast.error("Failed to sync user");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="border rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSynced = Boolean(user.synced_at);

            return (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {isSynced ? (
                    <Badge variant="secondary">Synced</Badge>
                  ) : (
                    <Badge variant="destructive">Pending</Badge>
                  )}
                </td>
                <td className="p-3">
                  {!isSynced && (
                    <Button
                      size="sm"
                      disabled={loadingId === user.id}
                      onClick={() => syncUser(user.id)}
                    >
                      {loadingId === user.id ? "Syncing..." : "Sync Data"}
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
