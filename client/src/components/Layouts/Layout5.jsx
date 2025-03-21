import React from "react";

const Layout5 = ({ formData }) => {
  const {
    name,
    email,
    phone,
    address,
    summary,
    education = [],
    experience = [],
    skills = [],
    projects = [],
  } = formData;

  return (
    <div className="bg-white p-8 shadow-lg rounded-xl max-w-[800px] mx-auto font-sans text-gray-900">
      {/* Header */}
      <div className="text-center border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-blue-700 uppercase">{name || "Your Name"}</h1>
        <p className="text-sm mt-2">{email} | {phone} | {address}</p>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-1 border-b border-gray-200">Profile Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-1 border-b border-gray-200">Education</h2>
          <ul className="space-y-2 mt-2">
            {education.map((edu, index) => (
              <li key={index}>
                <p className="font-semibold text-sm">{edu.degree} - {edu.institution}</p>
                <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</p>
                <p className="text-sm text-gray-700">{edu.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-1 border-b border-gray-200">Experience</h2>
          <ul className="space-y-2 mt-2">
            {experience.map((exp, index) => (
              <li key={index}>
                <p className="font-semibold text-sm">{exp.position} - {exp.company}</p>
                <p className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</p>
                <p className="text-sm text-gray-700">{exp.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-1 border-b border-gray-200">Projects</h2>
          <ul className="space-y-2 mt-2">
            {projects.map((project, index) => (
              <li key={index}>
                <p className="font-semibold text-sm">{project.title}</p>
                <p className="text-sm text-gray-700">{project.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-blue-700 mb-1 border-b border-gray-200">Skills</h2>
          <ul className="flex flex-wrap gap-2 mt-2 text-sm">
            {skills.map((skill, index) => (
              <li key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Layout5;
