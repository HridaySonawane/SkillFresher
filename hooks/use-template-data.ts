/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export function useTemplateData(templateId: string) {
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!templateId) return;
    setLoading(true);
    fetch(`/api/templates/${templateId}`)
      .then(res => res.json())
      .then(data => {
        setTemplate(data);
        setLoading(false);
      });
  }, [templateId]);

  return { template, loading };
}
