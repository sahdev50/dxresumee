import React, { useRef, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useReactToPrint } from "react-to-print";

const ResumeCreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });

  const [layout, setLayout] = useState("layout1");

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({contentRef})

  const handleDownload = () => {
      reactToPrintFn()
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <ResumeForm formData={formData} setFormData={setFormData} />

        <div className="space-y-4 w-full">
          <div className="flex justify-between items-center">
            <select
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="layout1">Layout 1 - Classic</option>
              <option value="layout2">Layout 2 - Modern</option>
              <option value="layout3">Layout 3 - Professional</option>
              <option value="layout4">Layout 4 - Minimalist</option>
              <option value="layout5">Layout 5 - Creative</option>
            </select>
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>

          <div ref={contentRef}>
            <ResumePreview formData={formData} selectedLayout={layout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCreatePage;
