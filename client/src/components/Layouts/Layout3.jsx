import React from "react";

const Layout3 = ({ formData }) => {
  return (
    <div id="resume-preview" className="w-full max-w-4xl mx-auto border shadow-lg bg-white text-gray-900 font-sans grid grid-cols-3 gap-6 p-6">
      {/* Left Column */}
      <div className="col-span-1 bg-gray-100 p-4 rounded-xl space-y-4">
        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold border-b border-gray-400 mb-2">Contact</h2>
          <p>{formData.email}</p>
          <p>{formData.phone}</p>
        </div>

        {/* Skills */}
        {formData.skills && (
          <div>
            <h2 className="text-lg font-semibold border-b border-gray-400 mb-2">Skills</h2>
            <ul className="list-disc list-inside text-sm">
              {formData.skills.split(",").map((skill, idx) => (
                <li key={idx}>{skill.trim()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="col-span-2 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-700">{formData.name}</h1>
          <hr className="my-2 border-blue-500" />
        </div>

        {/* Summary */}
        {formData.summary && (
          <div>
            <h2 className="text-xl font-semibold mb-1">Profile Summary</h2>
            <p className="text-gray-800">{formData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {formData.experience && (
          <div>
            <h2 className="text-xl font-semibold mb-1">Experience</h2>
            <p className="text-gray-800 whitespace-pre-line">{formData.experience}</p>
          </div>
        )}

        {/* Education */}
        {formData.education && (
          <div>
            <h2 className="text-xl font-semibold mb-1">Education</h2>
            <p className="text-gray-800 whitespace-pre-line">{formData.education}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout3;
