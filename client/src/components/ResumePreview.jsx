import React from "react";
import Layout1 from "./Layouts/Layout1";
import Layout2 from "./Layouts/Layout2";
import Layout3 from "./Layouts/Layout3";
import Layout4 from "./Layouts/Layout4";
import Layout5 from "./Layouts/Layout5";

const ResumePreview = ({ formData, selectedLayout }) => {
  const renderLayout = () => {
    switch (selectedLayout) {
      case "layout1":
        return <Layout1 formData={formData} />;
      case "layout2":
        return <Layout2 formData={formData} />;
      case "layout3":
        return <Layout3 formData={formData} />;
      case "layout4":
        return <Layout4 formData={formData} />;
      case "layout5":
        return <Layout5 formData={formData} />;
      default:
        return <Layout1 formData={formData} />; // fallback to Layout1
    }
  };

  return (
    <div className="w-full h-full overflow-auto p-4 bg-gray-100 rounded-xl">
      {renderLayout()}
    </div>
  );
};

export default ResumePreview;
