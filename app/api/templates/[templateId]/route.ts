import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { templateId: string } }
) {
  const { templateId } = params;
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("id", templateId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }
  return NextResponse.json(data);
} 