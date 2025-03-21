import React from "react";

const Layout4 = ({ formData }) => {
  return (
    <div id="resume-preview" className="w-full max-w-3xl mx-auto p-10 bg-white shadow-xl rounded-2xl text-gray-900 font-sans space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-800">{formData.name}</h1>
        <p className="text-md text-gray-600 mt-1">{formData.email} | {formData.phone}</p>
      </div>

      {/* Summary */}
      {formData.summary && (
        <div>
          <h2 className="text-2xl font-semibold border-b border-gray-300 mb-2 pb-1">Summary</h2>
          <p className="text-gray-800 whitespace-pre-line">{formData.summary}</p>
        </div>
      )}

      {/* Skills */}
      {formData.skills && (
        <div>
          <h2 className="text-2xl font-semibold border-b border-gray-300 mb-2 pb-1">Skills</h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {formData.skills.split(",").map((skill, idx) => (
              <li key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {skill.trim()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {formData.experience && (
        <div>
          <h2 className="text-2xl font-semibold border-b border-gray-300 mb-2 pb-1">Experience</h2>
          <p className="text-gray-800 whitespace-pre-line">{formData.experience}</p>
        </div>
      )}

      {/* Education */}
      {formData.education && (
        <div>
          <h2 className="text-2xl font-semibold border-b border-gray-300 mb-2 pb-1">Education</h2>
          <p className="text-gray-800 whitespace-pre-line">{formData.education}</p>
        </div>
      )}
    </div>
  );
};

export default Layout4;
