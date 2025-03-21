import React from "react";

const ResumeForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-xl shadow-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Resume Form</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      />

      <textarea
        name="summary"
        placeholder="Professional Summary"
        value={formData.summary}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        rows={4}
      />

      <textarea
        name="experience"
        placeholder="Work Experience (e.g. Role, Company, Duration, Description)"
        value={formData.experience}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        rows={4}
      />

      <textarea
        name="education"
        placeholder="Education (e.g. Degree, Institution, Year)"
        value={formData.education}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        rows={4}
      />

      <textarea
        name="skills"
        placeholder="Skills (e.g. JavaScript, React, Tailwind)"
        value={formData.skills}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        rows={3}
      />
    </div>
  );
};

export default ResumeForm;
