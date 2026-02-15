/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Crown,
  Star,
  Download,
  Eye,
  Grid,
  List,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Link from "next/link";

interface TemplateSelectionProps {
  onTemplateSelect: (templateId: string) => void;
  userId: string;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "professional", label: "Professional" },
  { value: "creative", label: "Creative" },
  { value: "technology", label: "Technology" },
  { value: "academic", label: "Academic" },
];

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Highest Rated" },
  { value: "downloads", label: "Most Downloaded" },
];

export function TemplateSelection({
  onTemplateSelect,
}: TemplateSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then(setTemplates);
  }, []);

  const loadMoreTemplates = () => {
    // Fetch more templates from the API
    fetch("/api/templates?offset=" + templates.length)
      .then((res) => res.json())
      .then((newTemplates) => {
        setTemplates((prev) => [...prev, ...newTemplates]);
      });
  };

  const filteredTemplates = templates
    .filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (template.description || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        // Search in config.features if present
        ((template.config?.features || []) as string[]).some((feature) =>
          feature.toLowerCase().includes(searchTerm.toLowerCase()),
        ) ||
        // Search in industry array
        (template.industry || []).some((industry) =>
          industry.toLowerCase().includes(searchTerm.toLowerCase()),
        ) ||
        // Search in experience_level array
        (template.experience_level || []).some((level) =>
          level.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      const matchesCategory =
        selectedCategory === "all" ||
        template.category.toLowerCase() === selectedCategory;
      const matchesPremium = !showPremiumOnly || template.is_premium;
      return matchesSearch && matchesCategory && matchesPremium;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.usage_count || 0) - (a.usage_count || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "downloads":
          return (b.usage_count || 0) - (a.usage_count || 0);
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        default:
          return 0;
      }
    });

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    onTemplateSelect(templateId);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("popular");
    setShowPremiumOnly(false);
  };

  const hasActiveFilters =
    searchTerm || selectedCategory !== "all" || showPremiumOnly;

  return (
    <div className="h-full overflow-y-auto p-6 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-300">
              Choose Your Template
            </h2>
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select from our collection of professionally designed, ATS-friendly
            resume templates. Each template is crafted to help you stand out and
            land your dream job.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search templates by name, description, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {/* Category Filter */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Premium Filter */}
              <Button
                variant={showPremiumOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPremiumOnly(!showPremiumOnly)}
                className="flex items-center gap-2"
              >
                <Crown className="w-4 h-4" />
                Premium Only
              </Button>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredTemplates.length} template
            {filteredTemplates.length !== 1 ? "s" : ""} found
          </p>
          {hasActiveFilters && <Badge variant="secondary">Filtered</Badge>}
        </div>

        {/* Templates Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className={`group hover:shadow-lg py-0 transition-all duration-300 cursor-pointer ${
                  selectedTemplate === template.id
                    ? "ring-2 ring-blue-500 shadow-lg"
                    : ""
                }`}
              >
                <CardContent className="p-0">
                  {/* Template Preview */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      {/* <div className="text-center">
												<div className="w-16 h-20 bg-white rounded shadow-sm mx-auto mb-2"></div>
												<span className="text-gray-500 text-xs">
													Template Preview
												</span>
											</div> */}
                      <Image
                        src={template.thumbnail_url}
                        alt={"Academic Researcher"}
                        fill
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                    {/* Action Buttons */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                                  template.preview_image_url ||
                                  "/placeholder.svg"
                                }
                                alt={template.name}
                                fill
                                className="object-cover transition-transform duration-300"
                              />
                            )}
                          </div>
                          <Button
                            // size="sm"
                            onClick={() => handleTemplateSelect(template.id)}
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
                    <Badge
                      variant="secondary"
                      className="absolute top-3 left-3"
                    >
                      {template.category}
                    </Badge>

                    {/* Popular Badge
										{template.tags.includes("popular") && (
											<Badge className="absolute bottom-3 left-3 bg-red-500 text-white">
												Popular
											</Badge>
										)} */}
                  </div>

                  {/* Template Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-300">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                        {template.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1">
                      {((template.config?.features || []) as string[])
                        .slice(0, 3)
                        .map((feature) => (
                          <Badge
                            key={feature}
                            variant="outline"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{template.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{template.usage_count.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {/* <Button
												variant="outline"
												size="sm"
												className="flex-1"
											>
												<Eye className="w-4 h-4 mr-1" />
												Preview
											</Button> */}
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className={`group hover:shadow-md transition-all duration-300 cursor-pointer ${
                  selectedTemplate === template.id
                    ? "ring-2 ring-blue-500 shadow-lg"
                    : ""
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Template Preview */}
                    <div className="relative w-32 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0">
                      <Image
                        src={template.thumbnail_url}
                        alt={"Academic Researcher"}
                        fill
                      />
                      {template.is_premium && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500 text-yellow-900 text-xs">
                          <Crown className="w-2 h-2 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-300">
                            {template.name}
                          </h3>
                          <Badge variant="secondary">{template.category}</Badge>
                          {/* {template.tags.includes(
														"popular"
													) && (
														<Badge className="bg-red-500 text-white">
															Popular
														</Badge>
													)} */}
                        </div>
                        <p className="text-gray-600 truncate">
                          {template.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {((template.config?.features || []) as string[]).map(
                          (feature) => (
                            <Badge
                              key={feature}
                              variant="outline"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ),
                        )}
                      </div>

                      {/* Stats and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{template.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            <span>{template.usage_count.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {/* <Button
														variant="outline"
														size="sm"
													>
														<Eye className="w-4 h-4 mr-1" />
														Preview
													</Button> */}
                          <Button size="sm">Use Template</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No templates found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what
              you&apos;re looking for.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}

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

        {/* Quick Actions */}
        <div className="bg-gray-50 dark:bg-gray-800/75 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-300 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Crown className="w-4 h-4 mr-2" />
              View Premium Templates
            </Button>
            <Button variant="outline" className="justify-start">
              <Star className="w-4 h-4 mr-2" />
              Most Popular Templates
            </Button>
            <Button variant="outline" className="justify-start">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Template Recommendations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
