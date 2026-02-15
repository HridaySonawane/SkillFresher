"use client";

import { TemplateGallery } from "@/components/templates/template-gallery";
import { TemplateHeader } from "@/components/templates/template-header";
import { TemplateFilters } from "@/components/templates/template-filters";
import { TemplateCategories } from "@/components/templates/template-categories";
import { useState } from "react";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:bg-gray-950">
      <TemplateHeader />
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 dark:bg-gray-950">
        <TemplateCategories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8 dark:bg-gray-950">
          <div className="lg:col-span-1">
            <TemplateFilters />
          </div>
          <div className="lg:col-span-3">
            <TemplateGallery
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
