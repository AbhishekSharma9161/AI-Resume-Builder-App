import React from 'react';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="text-center border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-gray-600 space-y-1">
          {resumeData.personalInfo.email && (
            <p>{resumeData.personalInfo.email}</p>
          )}
          {resumeData.personalInfo.phone && (
            <p>{resumeData.personalInfo.phone}</p>
          )}
          {resumeData.personalInfo.location && (
            <p>{resumeData.personalInfo.location}</p>
          )}
          {resumeData.personalInfo.website && (
            <p>{resumeData.personalInfo.website}</p>
          )}
          {resumeData.personalInfo.linkedin && (
            <p>{resumeData.personalInfo.linkedin}</p>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.summary && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Experience
          </h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <p className="text-blue-600 font-medium">
                  {exp.company} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                {exp.description && (
                  <p className="text-gray-700 mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {resumeData.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-bold text-gray-900">
                  {edu.degree} in {edu.fieldOfStudy}
                </h3>
                <p className="text-blue-600 font-medium">
                  {edu.school} • {edu.startDate} - {edu.endDate}
                </p>
                {edu.gpa && (
                  <p className="text-gray-700">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}