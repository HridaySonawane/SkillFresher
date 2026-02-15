/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Star, Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function TemplateGallery({ selectedCategory, setSelectedCategory }: { selectedCategory: string; setSelectedCategory: (category: string) => void }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/templates?offset=" + templates.length)
      .then((res) => res.json())
      .then(setTemplates);
  }, []);

  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTemplates = templates.filter((template) => {
    if (!selectedCategory || selectedCategory === "all") return true;
    return template.category === selectedCategory;
  });

  // const handlePreview = (templateId: string) => {
  // 	setSelectedTemplate(templateId);
  // 	// Open preview modal or navigate to preview page
  // };

  const loadMoreTemplates = () => {
    // Fetch more templates from the API
    fetch("/api/templates?offset=" + templates.length)
      .then((res) => res.json())
      .then((newTemplates) => {
        setTemplates((prev) => [...prev, ...newTemplates]);
      });
  };

  const handleUseTemplate = (templateId: string) => {
    // Navigate to builder with selected template
    window.location.href = `/builder?template=${templateId}`;
  };

  return (
    <div className="space-y-6 dark:bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-300">
            All Templates
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {templates.length} professional templates available
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            List
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="group hover:shadow-lg transition-shadow duration-300 py-0"
          >
            <CardContent className="p-0 flex flex-col h-full">
              {/* Template Preview */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg bg-gray-100">
                <Image
                  src={template.thumbnail_url || "/placeholder.svg"}
                  alt={template.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Action Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* <Button
										size="sm"
										variant="secondary"
										onClick={() =>
											handlePreview(template.id)
										}
									>
										<Eye className="w-4 h-4 mr-1" />
										Preview
									</Button> */}
                  <Dialog>
                    <DialogTrigger className="flex items-center justify-center w-full h-full bg-transparent">
                      <div className="bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-8 w-fit flex items-center rounded-md gap-1.5 px-3 has-[>svg]:px-2.5">
                        <Eye className="w-5 h-5 mr-1" />
                        Preview
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{template.name} - Preview</DialogTitle>
                        <DialogDescription>
                          {template.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                        {template.preview_image_url && (
                          <Image
                            src={
                              template.preview_image_url || "/placeholder.svg"
                            }
                            alt={template.name}
                            fill
                            className="object-cover transition-transform duration-300"
                          />
                        )}
                      </div>
                      <Button
                      // size="sm"
                      >
                        <Link href="/auth/signup">Use Template</Link>
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Premium Badge */}
                {template.is_premium && (
                  <Badge className="absolute top-3 right-3 bg-yellow-500 text-yellow-900">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}

                {/* Category Badge */}
                <Badge variant="secondary" className="absolute top-3 left-3">
                  {template.category}
                </Badge>
              </div>

              {/* Template Info */}
              <div className="p-4 space-y-3 dark:bg-gradient-to-b from-transparent/70 backdrop-blur-2xl">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-300">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                    {template.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-300">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{template.usage_count.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-xl text-black font-semibold">
                    {template.is_premium
                      ? "$" + `${template.price_cents}` + "/month"
                      : "Free"}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 cursor-pointer"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    {template.is_premium ? (
                      <>
                        <Link href="/auth/signup">
                          {/* <Crown className="w-4 h-4 mr-1" /> */}
                          Use Premium
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/signup">
                          {/* <Sparkles className="w-4 h-4 mr-1" /> */}
                          Use Free
                        </Link>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button
          variant="outline"
          size="lg"
          className="bg-transparent"
          onClick={loadMoreTemplates}
        >
          Load More Templates
        </Button>
      </div>
    </div>
  );
}
