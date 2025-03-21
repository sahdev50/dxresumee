import React from "react";

const Layout2 = ({ formData }) => {
  return (
    <div id="resume-preview" className="w-full max-w-3xl mx-auto border shadow-lg bg-white text-gray-900 font-sans">
      {/* Header */}
      <div className="bg-blue-700 text-white p-6 rounded-t-xl">
        <h1 className="text-3xl font-bold">{formData.name}</h1>
        <p className="text-sm">{formData.email} | {formData.phone}</p>
      </div>

      {/* Body Content */}
      <div className="p-6 space-y-6">
        {/* Summary */}
        {formData.summary && (
          <div>
            <h2 className="text-xl font-semibold border-b-2 border-blue-500 mb-1">Summary</h2>
            <p className="text-gray-800">{formData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {formData.experience && (
          <div>
            <h2 className="text-xl font-semibold border-b-2 border-blue-500 mb-1">Experience</h2>
            <p className="text-gray-800 whitespace-pre-line">{formData.experience}</p>
          </div>
        )}

        {/* Education */}
        {formData.education && (
          <div>
            <h2 className="text-xl font-semibold border-b-2 border-blue-500 mb-1">Education</h2>
            <p className="text-gray-800 whitespace-pre-line">{formData.education}</p>
          </div>
        )}

        {/* Skills */}
        {formData.skills && (
          <div>
            <h2 className="text-xl font-semibold border-b-2 border-blue-500 mb-1">Skills</h2>
            <ul className="list-disc list-inside text-gray-800">
              {formData.skills.split(",").map((skill, idx) => (
                <li key={idx}>{skill.trim()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout2;
