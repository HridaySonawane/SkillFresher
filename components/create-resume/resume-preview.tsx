"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import type { ResumeData } from "@/lib/document-generators/types";

interface ResumePreviewProps {
  templateId: string;
  data: ResumeData;
  currentStep: "template" | "form" | "preview";
}

export function ResumePreview({
  templateId,
  data,
  currentStep,
  isPdf = false,
}: ResumePreviewProps & { isPdf?: boolean }) {
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale(Math.min(scale + 0.1, 2));
  const zoomOut = () => setScale(Math.max(scale - 0.1, 0.5));
  const resetZoom = () => setScale(1);

  // const [templates, setTemplates] = useState([]);

  // useEffect(() => {
  // 	fetch(`/api/templates/${templateId}`)
  // 		.then((res) => res.json())
  // 		.then(setTemplates);
  // }, []);

  const renderTemplate = () => {
    switch (templateId) {
      case "modern-professional":
        return <ModernProfessionalTemplate data={data} />;
      case "creative-designer":
        return <CreativeDesignerTemplate data={data} />;
      case "tech-minimalist":
        return <TechMinimalistTemplate data={data} />;
      case "classic-executive":
        return <ExecutiveClassicTemplate data={data} />;
      case "academic-researcher":
        return <AcademicResearcherTemplate data={data} />;
      case "two-column-modern":
        return <TwoColumnModernTemplate data={data} />;
      case "timeline":
        return <TimelineTemplate data={data} />;
      case "photo-header":
        return <PhotoHeaderTemplate data={data} />;
      case "elegant-minimalist":
        return <ElegantMinimalistTemplate data={data} />;
      case "bold-sidebar":
        return <BoldSidebarTemplate data={data} />;
      default:
        return <ModernProfessionalTemplate data={data} />;
    }
  };

  // const getStepMessage = () => {
  //   switch (currentStep) {
  //     case "template":
  //       return {
  //         title: "Choose Your Template",
  //         description: "Select a professional template to get started",
  //         icon: "🎨",
  //       };
  //     case "form":
  //       return {
  //         title: "Fill in Your Details",
  //         description: "Add your information to see it appear here",
  //         icon: "✏️",
  //       };
  //     case "preview":
  //       return {
  //         title: "Review Your Resume",
  //         description: "Your resume is ready for download",
  //         icon: "✅",
  //       };
  //   }
  // };

  // const stepMessage = getStepMessage();

  return (
    <div className="h-full w-full flex flex-col border-none overflow-hidden">
      {/* Preview Controls */}
      {!isPdf && (
        <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-950 border-gray-200 dark:border-neutral-800">
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
          {currentStep === "preview" && (
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      )}

      {/* Preview Area */}
      {/* <div className="flex-1 overflow-auto p-6 bg-gray-100">
				{/* {currentStep === "template" && (
					<div className="h-full flex items-center justify-center">
						<Card className="max-w-md text-center">
							<CardContent className="p-8">
								<div className="text-4xl mb-4">
									{stepMessage.icon}
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									{stepMessage.title}
								</h3>
								<p className="text-gray-600">
									{stepMessage.description}
								</p>
							</CardContent>
						</Card>
					</div>
				)} 

			</div> */}
      {currentStep === "form" && (
        <div
          className="flex-1 overflow-auto bg-white shadow-lg"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            // width: "210mm", // A4 width
            minHeight: "297mm", // A4 height
          }}
        >
          {renderTemplate()}
        </div>
        // <div className="flex justify-center">
        // </div>
      )}

      {currentStep === "preview" && (
        <div
          // ref={pdfRef}
          className=" flex-1 bg-white shadow-lg"
          style={{
            // transform: `scale(${scale})`,
            // transformOrigin: "top center",
            width: "210mm", // A4 width
            minHeight: "297mm", // A4 height
          }}
        >
          {renderTemplate()}
        </div>
        // <div className="flex justify-center">
        // </div>
      )}
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
          {data.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-lg text-gray-600 mb-3">Professional Title</p>
        <div className="flex justify-center gap-4 text-sm text-gray-500 mb-2">
          <span>{data.personalInfo.email || "email@example.com"}</span>
          <span>{data.personalInfo.phone || "Phone"}</span>
          <span>{data.personalInfo.location || "Location"}</span>
        </div>
        {(data.personalInfo.linkedin || data.personalInfo.website) && (
          <div className="flex justify-center gap-4 text-sm text-blue-600">
            <span>{data.personalInfo.linkedin}</span>
            <span>{data.personalInfo.website}</span>
          </div>
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
          {data.experience.length > 0 ? (
            data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-800">
                    {exp.position || "Position"}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate || "Start"} - {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company || "Company"}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc || "Description"}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">Add your work experience</div>
          )}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
          EDUCATION
        </h2>
        {data.education.length > 0 ? (
          data.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800">
                  {edu.degree || "Degree"}
                </h3>
                <span className="text-sm text-gray-500">
                  {edu.graduationDate || "Date"}
                </span>
              </div>
              <p className="text-gray-600">
                {edu.institution || "Institution"}
              </p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">Add your education</div>
        )}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
          SKILLS
        </h2>
        {data.skills.length > 0 ? (
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
        ) : (
          <div className="text-gray-500 italic">Add your skills</div>
        )}
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
          {data.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Creative Designer & Developer
        </p>
        <div className="flex justify-center gap-6 text-sm text-gray-500">
          <span>{data.personalInfo.email || "email@example.com"}</span>
          <span>{data.personalInfo.phone || "Phone"}</span>
          <span>{data.personalInfo.location || "Location"}</span>
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
          {data.experience.length > 0 ? (
            data.experience.map((exp, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800">
                    {exp.position || "Position"}
                  </h3>
                  <span className="text-sm text-purple-500 font-medium">
                    {exp.startDate || "Start"} - {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-purple-600 mb-3">
                  {exp.company || "Company"}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc || "Description"}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">Add your work experience</div>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-purple-600 mb-4">SKILLS</h2>
        {data.skills.length > 0 ? (
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
        ) : (
          <div className="text-gray-500 italic">Add your skills</div>
        )}
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
          {data.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-lg text-gray-600 mb-4">Software Engineer</p>
        <div className="text-sm text-gray-500 space-y-1">
          <div>{data.personalInfo.email || "email@example.com"}</div>
          <div>{data.personalInfo.phone || "Phone"}</div>
          <div>{data.personalInfo.location || "Location"}</div>
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
          {data.experience.length > 0 ? (
            data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">
                    {exp.position || "Position"}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate || "Start"} - {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{exp.company || "Company"}</p>
                <ul className="list-none text-gray-700 space-y-1">
                  {exp.description.map((desc, i) => (
                    <li
                      key={i}
                      className="before:content-['>'] before:text-gray-400 before:mr-2"
                    >
                      {desc || "Description"}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">Add your work experience</div>
          )}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">SKILLS</h2>
        {data.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="font-mono">
                {skill}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 italic">Add your skills</div>
        )}
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
          {data.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-xl text-gray-600 mb-4">Executive Director</p>
        <div className="flex justify-center gap-8 text-sm text-gray-500">
          <span>{data.personalInfo.email || "email@example.com"}</span>
          <span>{data.personalInfo.phone || "Phone"}</span>
          <span>{data.personalInfo.location || "Location"}</span>
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
          {data.experience.length > 0 ? (
            data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {exp.position || "Position"}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate || "Start"} - {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-gray-600 mb-3 font-medium">
                  {exp.company || "Company"}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc || "Description"}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">Add your work experience</div>
          )}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
          CORE COMPETENCIES
        </h2>
        {data.skills.length > 0 ? (
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
        ) : (
          <div className="text-gray-500 italic">Add your skills</div>
        )}
      </div>
    </div>
  );
}

function AcademicResearcherTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 font-sans text-gray-900">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-lg text-gray-600 mb-3">Research Scientist</p>
        <div className="flex justify-center gap-6 text-sm text-gray-500 mb-2">
          <span>{data.personalInfo.email || "email@example.com"}</span>
          <span>{data.personalInfo.phone || "Phone"}</span>
          <span>{data.personalInfo.location || "Location"}</span>
        </div>
        <div className="flex justify-center gap-4 text-sm">
          <span
            className={`${data.personalInfo.linkedin ? " text-blue-600" : "text-gray-500"}`}
          >
            {data.personalInfo.linkedin || "LinkedIn"}
          </span>
          <span
            className={`${data.personalInfo.website ? " text-blue-600" : "text-gray-500"}`}
          >
            {data.personalInfo.website || "Website"}
          </span>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            RESEARCH INTERESTS
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
          RESEARCH EXPERIENCE
        </h2>
        <div className="space-y-4">
          {data.experience.length > 0 ? (
            data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-800">
                    {exp.position || "Position"}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate || "Start"} - {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">
                  {exp.company || "Institution"}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc || "Description"}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">
              Add your research experience
            </div>
          )}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
          EDUCATION
        </h2>
        {data.education.length > 0 ? (
          data.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800">
                  {edu.degree || "Degree"}
                </h3>
                <span className="text-sm text-gray-500">
                  {edu.graduationDate || "Date"}
                </span>
              </div>
              <p className="text-gray-600">
                {edu.institution || "Institution"}
              </p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">Add your education</div>
        )}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
          TECHNICAL SKILLS
        </h2>
        {data.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-100 text-gray-800"
              >
                {skill}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 italic">Add your technical skills</div>
        )}
      </div>
    </div>
  );
}

// function StartupFounderTemplate({ data }: { data: ResumeData }) {
// 	return (
// 		<div className="p-8 font-sans text-gray-900 bg-gradient-to-br from-blue-50 to-indigo-50">
// 			{/* Header */}
// 			<div className="text-center mb-8">
// 				<h1 className="text-4xl font-bold text-blue-600 mb-2">
// 					{data.personalInfo.name || "Your Name"}
// 				</h1>
// 				<p className="text-xl text-gray-600 mb-4">Founder & CEO</p>
// 				<div className="flex justify-center gap-6 text-sm text-gray-500">
// 					<span>
// 						{data.personalInfo.email || "email@example.com"}
// 					</span>
// 					<span>{data.personalInfo.phone || "Phone"}</span>
// 					<span>{data.personalInfo.location || "Location"}</span>
// 				</div>
// 			</div>

// 			{/* Summary */}
// 			{data.summary && (
// 				<div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
// 					<h2 className="text-lg font-bold text-blue-600 mb-2">
// 						VISION
// 					</h2>
// 					<p className="text-gray-700 leading-relaxed">
// 						{data.summary}
// 					</p>
// 				</div>
// 			)}

// 			{/* Experience */}
// 			<div className="mb-8">
// 				<h2 className="text-lg font-bold text-blue-600 mb-4">
// 					ENTREPRENEURIAL JOURNEY
// 				</h2>
// 				<div className="space-y-6">
// 					{data.experience.length > 0 ? (
// 						data.experience.map((exp, index) => (
// 							<div
// 								key={index}
// 								className="bg-white p-4 rounded-lg shadow-sm"
// 							>
// 								<div className="flex justify-between items-start mb-2">
// 									<h3 className="font-bold text-gray-800">
// 										{exp.position || "Position"}
// 									</h3>
// 									<span className="text-sm text-blue-500 font-medium">
// 										{exp.startDate || "Start"} -{" "}
// 										{exp.endDate || "Present"}
// 									</span>
// 								</div>
// 								<p className="text-blue-600 mb-3">
// 									{exp.company || "Company"}
// 								</p>
// 								<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
// 									{exp.description.map((desc, i) => (
// 										<li key={i}>{desc || "Description"}</li>
// 									))}
// 								</ul>
// 							</div>
// 						))
// 					) : (
// 						<div className="text-gray-500 italic">
// 							Add your entrepreneurial experience
// 						</div>
// 					)}
// 				</div>
// 			</div>

// 			{/* Skills */}
// 			<div className="mb-8">
// 				<h2 className="text-lg font-bold text-blue-600 mb-4">
// 					CORE COMPETENCIES
// 				</h2>
// 				{data.skills.length > 0 ? (
// 					<div className="flex flex-wrap gap-2">
// 						{data.skills.map((skill, index) => (
// 							<Badge
// 								key={index}
// 								variant="secondary"
// 								className="bg-blue-100 text-blue-800"
// 							>
// 								{skill}
// 							</Badge>
// 						))}
// 					</div>
// 				) : (
// 					<div className="text-gray-500 italic">
// 						Add your core competencies
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// }

// Elegant Minimalist Template
function ElegantMinimalistTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      className="flex bg-white shadow-lg rounded-lg overflow-hidden"
      style={{ /* width: "210mm", */ minHeight: "297mm" }}
    >
      {/* Sidebar */}
      <div className="w-1/3 bg-teal-50 p-6 flex flex-col items-center border-r border-teal-200">
        <h1 className="text-2xl font-serif font-bold text-teal-700 mb-2 text-center">
          {data.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-teal-500 mb-4 text-center">
          {data.personalInfo.email || "email@example.com"}
        </p>
        <p className="text-teal-500 mb-4 text-center">
          {data.personalInfo.phone || "Phone"}
        </p>
        <p className="text-teal-500 mb-6 text-center">
          {data.personalInfo.location || "Location"}
        </p>
        <div className="mb-6 w-full">
          <h2 className="text-teal-700 font-semibold mb-2 text-sm tracking-widest">
            SKILLS
          </h2>
          {data.skills.length > 0 ? (
            <ul className="list-disc list-inside text-teal-600 text-sm">
              {data.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-teal-300 italic">Add your skills</p>
          )}
        </div>
        <div className="w-full">
          <h2 className="text-teal-700 font-semibold mb-2 text-sm tracking-widest">
            LINKS
          </h2>
          {data.personalInfo.linkedin || data.personalInfo.website ? (
            <div className="text-teal-600 text-xs space-y-1">
              {data.personalInfo.linkedin && (
                <div>{data.personalInfo.linkedin}</div>
              )}
              {data.personalInfo.website && (
                <div>{data.personalInfo.website}</div>
              )}
            </div>
          ) : (
            <p className="text-teal-300 italic">Add your links</p>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8">
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-teal-700 mb-2 border-b border-teal-200 pb-1">
              PROFILE
            </h2>
            <p className="text-gray-700 text-sm">{data.summary}</p>
          </div>
        )}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-teal-700 mb-2 border-b border-teal-200 pb-1">
            EXPERIENCE
          </h2>
          {data.experience.length > 0 ? (
            data.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">
                    {exp.position || "Position"}
                  </span>
                  <span className="text-xs text-teal-500">
                    {exp.startDate || "Start"} - {exp.endDate || "Present"}
                  </span>
                </div>
                <div className="text-teal-600 text-sm mb-1">
                  {exp.company || "Company"}
                </div>
                <ul className="list-disc list-inside text-gray-600 text-xs ml-4">
                  {exp.description.map((desc, j) => (
                    <li key={j}>{desc || "Description"}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-teal-300 italic">Add your experience</p>
          )}
        </div>
        <div>
          <h2 className="text-lg font-bold text-teal-700 mb-2 border-b border-teal-200 pb-1">
            EDUCATION
          </h2>
          {data.education.length > 0 ? (
            data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">
                    {edu.degree || "Degree"}
                  </span>
                  <span className="text-xs text-teal-500">
                    {edu.graduationDate || "Date"}
                  </span>
                </div>
                <div className="text-teal-600 text-sm">
                  {edu.institution || "Institution"}
                </div>
              </div>
            ))
          ) : (
            <p className="text-teal-300 italic">Add your education</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Bold Sidebar Template
function BoldSidebarTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      className="flex bg-white shadow-lg rounded-lg overflow-hidden"
      style={{ /* width: "210mm", */ minHeight: "297mm" }}
    >
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-900 text-white p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-2 text-center">
          {data.personalInfo.name || "Your Name"}
        </h1>
        <p className="mb-2 text-center">
          {data.personalInfo.email || "email@example.com"}
        </p>
        <p className="mb-2 text-center">{data.personalInfo.phone || "Phone"}</p>
        <p className="mb-6 text-center">
          {data.personalInfo.location || "Location"}
        </p>
        <div className="mb-6 w-full">
          <h2 className="font-semibold mb-2 text-sm tracking-widest">SKILLS</h2>
          {data.skills.length > 0 ? (
            <ul className="list-disc list-inside text-white text-xs">
              {data.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-blue-300 italic">Add your skills</p>
          )}
        </div>
        <div className="w-full">
          <h2 className="font-semibold mb-2 text-sm tracking-widest">LINKS</h2>
          {data.personalInfo.linkedin || data.personalInfo.website ? (
            <div className="text-white text-xs space-y-1">
              {data.personalInfo.linkedin && (
                <div>{data.personalInfo.linkedin}</div>
              )}
              {data.personalInfo.website && (
                <div>{data.personalInfo.website}</div>
              )}
            </div>
          ) : (
            <p className="text-blue-300 italic">Add your links</p>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-10">
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
              <span>📝</span> PROFILE
            </h2>
            <p className="text-gray-700 text-sm">{data.summary}</p>
          </div>
        )}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
            <span>💼</span> EXPERIENCE
          </h2>
          {data.experience.length > 0 ? (
            data.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">
                    {exp.position || "Position"}
                  </span>
                  <span className="text-xs text-blue-900">
                    {exp.startDate || "Start"} - {exp.endDate || "Present"}
                  </span>
                </div>
                <div className="text-blue-700 text-sm mb-1">
                  {exp.company || "Company"}
                </div>
                <ul className="list-disc list-inside text-gray-600 text-xs ml-4">
                  {exp.description.map((desc, j) => (
                    <li key={j}>{desc || "Description"}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-blue-300 italic">Add your experience</p>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
            <span>🎓</span> EDUCATION
          </h2>
          {data.education.length > 0 ? (
            data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">
                    {edu.degree || "Degree"}
                  </span>
                  <span className="text-xs text-blue-900">
                    {edu.graduationDate || "Date"}
                  </span>
                </div>
                <div className="text-blue-700 text-sm">
                  {edu.institution || "Institution"}
                </div>
              </div>
            ))
          ) : (
            <p className="text-blue-300 italic">Add your education</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Timeline Template
function TimelineTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      className="bg-white p-10 font-sans text-gray-900"
      style={{ /* width: "210mm", */ minHeight: "297mm" }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">
          {data.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          {data.personalInfo.email || "email@example.com"} |{" "}
          {data.personalInfo.phone || "Phone"} |{" "}
          {data.personalInfo.location || "Location"}
        </p>
        {(data.personalInfo.linkedin || data.personalInfo.website) && (
          <div className="text-indigo-600 text-sm">
            {data.personalInfo.linkedin && (
              <span className="mr-2">{data.personalInfo.linkedin}</span>
            )}
            {data.personalInfo.website && (
              <span>{data.personalInfo.website}</span>
            )}
          </div>
        )}
      </div>
      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">PROFILE</h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}
      {/* Timeline Experience */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-indigo-700 mb-6">EXPERIENCE</h2>
        <div className="relative border-l-2 border-indigo-200 ml-4">
          {data.experience.length > 0 ? (
            data.experience.map((exp, i) => (
              <div key={i} className="mb-8 ml-6 relative">
                <div className="absolute -left-6 top-1 w-4 h-4 bg-indigo-500 rounded-full border-2 border-white"></div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-800">
                    {exp.position || "Position"}
                  </span>
                  <span className="text-xs text-indigo-500">
                    {exp.startDate || "Start"} - {exp.endDate || "Present"}
                  </span>
                </div>
                <div className="text-indigo-700 text-sm mb-1">
                  {exp.company || "Company"}
                </div>
                <ul className="list-disc list-inside text-gray-600 text-xs ml-4">
                  {exp.description.map((desc, j) => (
                    <li key={j}>{desc || "Description"}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-indigo-300 italic ml-6">Add your experience</p>
          )}
        </div>
      </div>
      {/* Timeline Education */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-indigo-700 mb-6">EDUCATION</h2>
        <div className="relative border-l-2 border-indigo-200 ml-4">
          {data.education.length > 0 ? (
            data.education.map((edu, i) => (
              <div key={i} className="mb-8 ml-6 relative">
                <div className="absolute -left-6 top-1 w-4 h-4 bg-indigo-500 rounded-full border-2 border-white"></div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-800">
                    {edu.degree || "Degree"}
                  </span>
                  <span className="text-xs text-indigo-500">
                    {edu.graduationDate || "Date"}
                  </span>
                </div>
                <div className="text-indigo-700 text-sm mb-1">
                  {edu.institution || "Institution"}
                </div>
              </div>
            ))
          ) : (
            <p className="text-indigo-300 italic ml-6">Add your education</p>
          )}
        </div>
      </div>
      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold text-indigo-700 mb-2">SKILLS</h2>
        {data.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-indigo-100 text-indigo-800"
              >
                {skill}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-indigo-300 italic">Add your skills</p>
        )}
      </div>
    </div>
  );
}

// Two-Column Modern Template
function TwoColumnModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      className="bg-gray-50 p-10 font-sans text-gray-900"
      style={{ /* width: "210mm", */ minHeight: "297mm" }}
    >
      <div className="flex gap-8">
        {/* Left Column */}
        <div className="w-1/2">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            {data.personalInfo.name || "Your Name"}
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            {data.personalInfo.email || "email@example.com"}
          </p>
          <p className="text-gray-600 mb-2">
            {data.personalInfo.phone || "Phone"}
          </p>
          <p className="text-gray-600 mb-4">
            {data.personalInfo.location || "Location"}
          </p>
          {data.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-2">PROFILE</h2>
              <p className="text-gray-700 text-sm">{data.summary}</p>
            </div>
          )}
          <div>
            <h2 className="text-lg font-bold text-blue-700 mb-2">SKILLS</h2>
            {data.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-blue-300 italic">Add your skills</p>
            )}
          </div>
        </div>
        {/* Right Column */}
        <div className="w-1/2">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-blue-700 mb-2">EXPERIENCE</h2>
            {data.experience.length > 0 ? (
              data.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">
                      {exp.position || "Position"}
                    </span>
                    <span className="text-xs text-blue-700">
                      {exp.startDate || "Start"} - {exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-blue-700 text-sm mb-1">
                    {exp.company || "Company"}
                  </div>
                  <ul className="list-disc list-inside text-gray-600 text-xs ml-4">
                    {exp.description.map((desc, j) => (
                      <li key={j}>{desc || "Description"}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-blue-300 italic">Add your experience</p>
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-700 mb-2">EDUCATION</h2>
            {data.education.length > 0 ? (
              data.education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">
                      {edu.degree || "Degree"}
                    </span>
                    <span className="text-xs text-blue-700">
                      {edu.graduationDate || "Date"}
                    </span>
                  </div>
                  <div className="text-blue-700 text-sm">
                    {edu.institution || "Institution"}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-blue-300 italic">Add your education</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Photo Header Template
function PhotoHeaderTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      className="bg-white p-10 font-sans text-gray-900"
      style={{ /* width: "210mm", */ minHeight: "297mm" }}
    >
      {/* Header with Photo */}
      <div className="flex items-center gap-8 mb-10">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-blue-200">
          {/* Placeholder for photo, can be replaced with actual image */}
          {data.personalInfo.photoUrl ? (
            <Image
              src={data.personalInfo.photoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl text-blue-300">👤</span>
          )}
        </div>
        <div>
          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            {data.personalInfo.name || "Your Name"}
          </h1>
          <p className="text-gray-600 mb-1">
            {data.personalInfo.email || "email@example.com"}
          </p>
          <p className="text-gray-600 mb-1">
            {data.personalInfo.phone || "Phone"}
          </p>
          <p className="text-gray-600 mb-1">
            {data.personalInfo.location || "Location"}
          </p>
          {(data.personalInfo.linkedin || data.personalInfo.website) && (
            <div className="text-blue-600 text-sm mt-2">
              {data.personalInfo.linkedin && (
                <span className="mr-2">{data.personalInfo.linkedin}</span>
              )}
              {data.personalInfo.website && (
                <span>{data.personalInfo.website}</span>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-700 mb-2">PROFILE</h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}
      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-700 mb-2">EXPERIENCE</h2>
        {data.experience.length > 0 ? (
          data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">
                  {exp.position || "Position"}
                </span>
                <span className="text-xs text-blue-700">
                  {exp.startDate || "Start"} - {exp.endDate || "Present"}
                </span>
              </div>
              <div className="text-blue-700 text-sm mb-1">
                {exp.company || "Company"}
              </div>
              <ul className="list-disc list-inside text-gray-600 text-xs ml-4">
                {exp.description.map((desc, j) => (
                  <li key={j}>{desc || "Description"}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-blue-300 italic">Add your experience</p>
        )}
      </div>
      {/* Education */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-700 mb-2">EDUCATION</h2>
        {data.education.length > 0 ? (
          data.education.map((edu, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">
                  {edu.degree || "Degree"}
                </span>
                <span className="text-xs text-blue-700">
                  {edu.graduationDate || "Date"}
                </span>
              </div>
              <div className="text-blue-700 text-sm">
                {edu.institution || "Institution"}
              </div>
            </div>
          ))
        ) : (
          <p className="text-blue-300 italic">Add your education</p>
        )}
      </div>
      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold text-blue-700 mb-2">SKILLS</h2>
        {data.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-blue-100 text-blue-800"
              >
                {skill}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-blue-300 italic">Add your skills</p>
        )}
      </div>
    </div>
  );
}
