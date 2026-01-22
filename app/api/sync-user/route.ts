import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { error } = await supabase
      .from("users")
      .update({ synced_at: new Date().toISOString() })
      .eq("id", userId);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "User synced successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to sync user" },
      { status: 500 }
    );
  }
}
