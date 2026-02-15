/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/auth";

export default function TestProfile() {
  const [result, setResult] = useState<{ data: any; error: any } | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Session user id:", user?.id);
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user?.id)
        .single();
      setResult({ data, error });
    }
    fetchProfile();
  }, []);

  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}