"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Palette, Code, GraduationCap, Zap } from "lucide-react";

const categories = [
  {
    id: "all",
    name: "All Templates",
    icon: <Zap className="w-4 h-4" />,
    count: 52,
    description: "Browse all available templates",
  },
  {
    id: "professional",
    name: "Professional",
    icon: <Briefcase className="w-4 h-4" />,
    count: 18,
    description: "Corporate and business roles",
  },
  {
    id: "creative",
    name: "Creative",
    icon: <Palette className="w-4 h-4" />,
    count: 12,
    description: "Design and creative industries",
  },
  {
    id: "tech",
    name: "Technology",
    icon: <Code className="w-4 h-4" />,
    count: 15,
    description: "Software and tech positions",
  },
  {
    id: "academic",
    name: "Academic",
    icon: <GraduationCap className="w-4 h-4" />,
    count: 7,
    description: "Education and research",
  },
];

export function TemplateCategories({ selectedCategory, setSelectedCategory }) {
  // const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="space-y-6 dark:bg-gray-950">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-300 mb-2">
          Browse by Category
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Find the perfect template for your industry and role
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`h-auto p-4 flex flex-col items-center gap-2 ${
              selectedCategory === category.id
                ? ""
                : "bg-transparent hover:bg-gray-50"
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="flex items-center gap-2">
              {category.icon}
              <span className="font-medium">{category.name}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {category.count} templates
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}
