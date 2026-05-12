"use client";

import { useState, useEffect } from "react";
import AdminEditor from "@/components/admin/AdminEditor";
import type { SiteContent } from "@/lib/content";

export default function HeroAdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/api/content").then((r) => r.json()).then(setContent);
  }, []);

  if (!content) return <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />;

  return (
    <AdminEditor
      title="Editar Hero"
      content={content}
      onSave={setContent}
      fields={[
        { name: "title", label: "Título principal (usa <br/> para saltos)", type: "text", path: "hero.title" },
        { name: "subtitle", label: "Subtítulo", type: "textarea", path: "hero.subtitle" },
        { name: "cta1_text", label: "Texto botón principal", type: "text", path: "hero.cta_primary.text" },
        { name: "cta1_link", label: "Link botón principal", type: "text", path: "hero.cta_primary.link" },
        { name: "cta2_text", label: "Texto botón secundario", type: "text", path: "hero.cta_secondary.text" },
        { name: "cta2_link", label: "Link botón secundario", type: "text", path: "hero.cta_secondary.link" },
      ]}
    />
  );
}
