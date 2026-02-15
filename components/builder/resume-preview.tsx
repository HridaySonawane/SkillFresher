"use client";

import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import type { ResumeData } from "@/lib/document-generators/types";

interface ResumePreviewProps {
  templateId: string;
  data: ResumeData; // <-- Accept resume data as a prop!
}

export function ResumePreview({ templateId, data }: ResumePreviewProps) {
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale(Math.min(scale + 0.1, 2));
  const zoomOut = () => setScale(Math.max(scale - 0.1, 0.5));
  const resetZoom = () => setScale(1);

  const renderTemplate = () => {
    switch (templateId) {
      case "modern-professional":
        return <ModernProfessionalTemplate data={data} />;
      case "creative-designer":
        return <CreativeDesignerTemplate data={data} />;
      case "tech-minimalist":
        return <TechMinimalistTemplate data={data} />;
      case "executive-classic":
        return <ExecutiveClassicTemplate data={data} />;
      default:
        return <ModernProfessionalTemplate data={data} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={zoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium w-16 text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button variant="outline" size="sm" onClick={zoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={resetZoom}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
        <Button size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-6 bg-gray-100">
        <div className="flex justify-center">
          <div
            className="bg-white shadow-lg"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              width: "210mm", // A4 width
              minHeight: "297mm", // A4 height
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Template Components
function ModernProfessionalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 font-sans text-gray-900">
      {/* Header */}
      <div className="text-center border-b-2 border-blue-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          {data.personalInfo.name}
        </h1>
        <p className="text-lg text-gray-600 mb-3">Senior Software Engineer</p>
        <div className="flex justify-center gap-4 text-sm text-gray-500 mb-2">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>

        {(data.personalInfo.linkedin || data.personalInfo.website) && (
          <div className="flex justify-center gap-4 text-sm text-blue-500">
            <span>{data.personalInfo.linkedin}</span>
            <span>{data.personalInfo.website}</span>
          </div>
          // <div className="mt-2">
          // </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
          PROFESSIONAL EXPERIENCE
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800">{exp.position}</h3>
                <span className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{exp.company}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
          EDUCATION
        </h2>
        {data.education.map((edu, index) => (
          <div key={index}>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-gray-800">{edu.degree}</h3>
              <span className="text-sm text-gray-500">
                {edu.graduationDate}
              </span>
            </div>
            <p className="text-gray-600">{edu.institution}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
          SKILLS
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-blue-100 text-blue-800"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function CreativeDesignerTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 font-sans text-gray-900 bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">
          {data.personalInfo.name}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Creative Designer & Developer
        </p>
        <div className="flex justify-center gap-6 text-sm text-gray-500">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-bold text-purple-600 mb-2">ABOUT ME</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-purple-600 mb-4">EXPERIENCE</h2>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">{exp.position}</h3>
                <span className="text-sm text-purple-500 font-medium">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-purple-600 mb-3">{exp.company}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-purple-600 mb-4">SKILLS</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function TechMinimalistTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 font-mono text-gray-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {data.personalInfo.name}
        </h1>
        <p className="text-lg text-gray-600 mb-4">Software Engineer</p>
        <div className="text-sm text-gray-500 space-y-1">
          <div>{data.personalInfo.email}</div>
          <div>{data.personalInfo.phone}</div>
          <div>{data.personalInfo.location}</div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">EXPERIENCE</h2>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{exp.company}</p>
              <ul className="list-none text-gray-700 space-y-1">
                {exp.description.map((desc, i) => (
                  <li
                    key={i}
                    className="before:content-['>'] before:text-gray-400 before:mr-2"
                  >
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">SKILLS</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="font-mono">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExecutiveClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 font-serif text-gray-900">
      {/* Header */}
      <div className="text-center border-b-4 border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {data.personalInfo.name}
        </h1>
        <p className="text-xl text-gray-600 mb-4">Executive Director</p>
        <div className="flex justify-center gap-8 text-sm text-gray-500">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
            EXECUTIVE SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
          PROFESSIONAL EXPERIENCE
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 text-lg">
                  {exp.position}
                </h3>
                <span className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-gray-600 mb-3 font-medium">{exp.company}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
          CORE COMPETENCIES
        </h2>
        <div className="flex flex-wrap gap-3">
          {data.skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-gray-100 text-gray-800 font-medium"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
