/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Star,
  FolderOpen,
  Check,
} from "lucide-react";
import type { ResumeData } from "@/lib/document-generators/types";

interface ResumeFormProps {
  data: ResumeData;
  onDataChange: (data: ResumeData) => void;
  templateId: string;
  onComplete: () => void;
  userId: string;
}

export function ResumeForm({
  data,
  onDataChange,
  onComplete,
}: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState("personal");
  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set(),
  );

  // --- Add this local state for the skills input ---
  const [skillsInput, setSkillsInput] = useState(data.skills.join(", "));

  // Keep local input in sync if data.skills changes from outside
  useEffect(() => {
    setSkillsInput(data.skills.join(", "));
  }, [data.skills]);

  // Add state for loadingSummary at the top of the component
  const [loadingSummary, setLoadingSummary] = useState(false);

  const sections = [
    { id: "personal", label: "Personal Info", icon: User, required: true },
    { id: "summary", label: "Summary", icon: Star, required: false },
    {
      id: "experience",
      label: "Experience",
      icon: Briefcase,
      required: true,
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      required: true,
    },
    { id: "skills", label: "Skills", icon: FolderOpen, required: true },
  ];

  const updatePersonalInfo = (
    field: keyof ResumeData["personalInfo"],
    value: string,
  ) => {
    onDataChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const updateSummary = (value: string) => {
    onDataChange({
      ...data,
      summary: value,
    });
  };

  const addExperience = () => {
    onDataChange({
      ...data,
      experience: [
        ...data.experience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: [""],
        },
      ],
    });
  };

  const updateExperience = (
    index: number,
    field: string,
    value: string | string[],
  ) => {
    const newExperience = [...data.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    onDataChange({
      ...data,
      experience: newExperience,
    });
  };

  const removeExperience = (index: number) => {
    onDataChange({
      ...data,
      experience: data.experience.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    onDataChange({
      ...data,
      education: [
        ...data.education,
        {
          institution: "",
          degree: "",
          graduationDate: "",
        },
      ],
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...data.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };
    onDataChange({
      ...data,
      education: newEducation,
    });
  };

  const removeEducation = (index: number) => {
    onDataChange({
      ...data,
      education: data.education.filter((_, i) => i !== index),
    });
  };

  const updateSkills = (value: string) => {
    onDataChange({
      ...data,
      skills: value
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    });
  };

  const isSectionComplete = (sectionId: string) => {
    switch (sectionId) {
      case "personal":
        return (
          data.personalInfo.name &&
          data.personalInfo.email &&
          data.personalInfo.phone
        );
      case "summary":
        return true; // Optional section
      case "experience":
        return (
          data.experience.length > 0 &&
          data.experience.every(
            (exp) => exp.position && exp.company && exp.startDate,
          )
        );
      case "education":
        return (
          data.education.length > 0 &&
          data.education.every((edu) => edu.degree && edu.institution)
        );
      case "skills":
        return data.skills.length > 0;
      default:
        return false;
    }
  };

  const handleSectionComplete = (sectionId: string) => {
    if (isSectionComplete(sectionId)) {
      setCompletedSections((prev) => new Set([...prev, sectionId]));
      if (sectionId !== "skills") {
        const nextSectionIndex =
          sections.findIndex((s) => s.id === sectionId) + 1;
        if (nextSectionIndex < sections.length) {
          setActiveSection(sections[nextSectionIndex].id);
        }
      }
    }
  };

  const isFormComplete = () => {
    return sections
      .filter((section) => section.required)
      .every((section) => isSectionComplete(section.id));
  };

  return (
    <div className="h-full flex flex-col items-center overflow-y-auto p-6 dark:bg-gray-950">
      <div className="w-full space-y-6">
        {/* Progress Indicator */}
        <Card>
          <CardContent className="px-4 py-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Resume Progress</h3>
              <Badge variant={isFormComplete() ? "default" : "secondary"}>
                {sections.filter((s) => isSectionComplete(s.id)).length}/
                {sections.length} Complete
              </Badge>
            </div>
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isComplete = isSectionComplete(section.id);
                return (
                  <div key={section.id} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isComplete
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isComplete ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${isComplete ? "text-green-600 font-medium" : "text-gray-600"}`}
                    >
                      {section.label}
                    </span>
                    {section.required && (
                      <Badge variant="outline" className="text-xs">
                        Required
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-evenly bg-gray-100 dark:bg-neutral-800 py-1 rounded-lg">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveSection(section.id)}
                className="flex-1/5"
              >
                <Icon className="w-4 h-4 mr-2" />
                {section.label}
              </Button>
            );
          })}
        </div>

        {/* Personal Information */}
        {activeSection === "personal" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={data.personalInfo.name}
                    onChange={(e) => updatePersonalInfo("name", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.personalInfo.email}
                    onChange={(e) =>
                      updatePersonalInfo("email", e.target.value)
                    }
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={data.personalInfo.phone}
                    onChange={(e) =>
                      updatePersonalInfo("phone", e.target.value)
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={data.personalInfo.location}
                    onChange={(e) =>
                      updatePersonalInfo("location", e.target.value)
                    }
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={data.personalInfo.linkedin || ""}
                    onChange={(e) =>
                      updatePersonalInfo("linkedin", e.target.value)
                    }
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={data.personalInfo.website || ""}
                    onChange={(e) =>
                      updatePersonalInfo("website", e.target.value)
                    }
                    placeholder="johndoe.com"
                  />
                </div>
              </div>
              <Button
                onClick={() => handleSectionComplete("personal")}
                className="w-full"
                disabled={!isSectionComplete("personal")}
              >
                Continue to Summary
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Professional Summary */}
        {activeSection === "summary" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Professional Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="summary">Summary (Optional)</Label>
                <Textarea
                  id="summary"
                  value={data.summary}
                  onChange={(e) => updateSummary(e.target.value)}
                  placeholder="Write a compelling professional summary..."
                  rows={6}
                />
                <p className="text-sm text-gray-500">
                  A brief overview of your professional background and key
                  strengths
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  disabled={loadingSummary}
                  onClick={async () => {
                    setLoadingSummary(true);
                    try {
                      const res = await fetch("/api/generate-summary", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          personalInfo: data.personalInfo,
                          experience: data.experience,
                          education: data.education,
                          skills: data.skills,
                        }),
                      });
                      const result = await res.json();
                      if (result.summary) {
                        updateSummary(result.summary);
                      }
                    } catch (err) {
                      // Optionally handle error
                    } finally {
                      setLoadingSummary(false);
                    }
                  }}
                >
                  {loadingSummary
                    ? "Generating..."
                    : "Generate Summary with AI"}
                </Button>
              </div>
              <Button
                onClick={() => handleSectionComplete("summary")}
                className="w-full mt-4"
                disabled={!isSectionComplete("summary")}
              >
                Continue to Experience
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Experience */}
        {activeSection === "experience" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Professional Experience *
                </CardTitle>
                <Button onClick={addExperience} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Experience {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Position *</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) =>
                          updateExperience(index, "position", e.target.value)
                        }
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company *</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(index, "company", e.target.value)
                        }
                        placeholder="Tech Corp"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date *</Label>
                      <Input
                        value={exp.startDate}
                        onChange={(e) =>
                          updateExperience(index, "startDate", e.target.value)
                        }
                        placeholder="Jan 2020"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        value={exp.endDate}
                        onChange={(e) =>
                          updateExperience(index, "endDate", e.target.value)
                        }
                        placeholder="Present"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description.join("\n")}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "description",
                          e.target.value.split("\n"),
                        )
                      }
                      placeholder="• Led development of key features..."
                      rows={4}
                    />
                  </div>
                </div>
              ))}
              {data.experience.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No experience added yet</p>
                  <Button onClick={addExperience} className="mt-2">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Experience
                  </Button>
                </div>
              )}
              <Button
                onClick={() => handleSectionComplete("experience")}
                className="w-full"
                disabled={!isSectionComplete("experience")}
              >
                Continue to Education
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Education */}
        {activeSection === "education" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education *
                </CardTitle>
                <Button onClick={addEducation} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Education {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Degree *</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(index, "degree", e.target.value)
                        }
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Institution *</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) =>
                          updateEducation(index, "institution", e.target.value)
                        }
                        placeholder="University of Technology"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Graduation Date</Label>
                    <Input
                      value={edu.graduationDate}
                      onChange={(e) =>
                        updateEducation(index, "graduationDate", e.target.value)
                      }
                      placeholder="May 2020"
                    />
                  </div>
                </div>
              ))}
              {data.education.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No education added yet</p>
                  <Button onClick={addEducation} className="mt-2">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Education
                  </Button>
                </div>
              )}
              <Button
                onClick={() => handleSectionComplete("education")}
                className="w-full"
                disabled={!isSectionComplete("education")}
              >
                Continue to Skills
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Skills */}
        {activeSection === "skills" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Skills *
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated) *</Label>
                <Textarea
                  id="skills"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  onBlur={() => updateSkills(skillsInput)}
                  placeholder="JavaScript, React, Node.js, Python..."
                  rows={4}
                />
                <p className="text-sm text-gray-500">
                  Separate skills with commas
                </p>
              </div>
              {data.skills.length > 0 && (
                <div className="mt-4">
                  <Label>Skills Preview</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <Button
                onClick={() => {
                  handleSectionComplete("skills");
                  onComplete();
                }}
                className="w-full mt-4"
                disabled={!isSectionComplete("skills")}
              >
                Review Resume
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Complete Resume Button */}
        {isFormComplete() && (
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                Resume Complete!
              </h3>
              <p className="text-gray-600 mb-4">
                All required sections have been filled out.
              </p>
              <Button onClick={onComplete} className="w-full">
                Continue to Preview
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
