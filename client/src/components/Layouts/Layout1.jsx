const Layout1 = ({ formData }) => (
    <div className="p-6" id="resume-preview">
      <h1 className="text-3xl font-bold">{formData.name}</h1>
      <p>{formData.email} | {formData.phone}</p>
      <hr className="my-2" />
      <h2 className="text-xl font-semibold">Summary</h2>
      <p>{formData.summary}</p>
      <h2 className="text-xl font-semibold mt-4">Experience</h2>
      <p>{formData.experience}</p>
      <h2 className="text-xl font-semibold mt-4">Education</h2>
      <p>{formData.education}</p>
      <h2 className="text-xl font-semibold mt-4">Skills</h2>
      <p>{formData.skills}</p>
    </div>
  );
  
  export default Layout1;
  