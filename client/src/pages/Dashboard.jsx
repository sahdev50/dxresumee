const Dashboard = () => {
    return (
      <div className="px-6 py-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to DxResumee Dashboard</h1>
        <p className="text-gray-600 text-lg mb-6">Let's build your professional resume in minutes!</p>
  
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">📄 Create Resume</h3>
            <p className="text-gray-600 text-sm">Start designing a professional resume from beautiful templates.</p>
          </div>
  
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">📤 Upload Resume</h3>
            <p className="text-gray-600 text-sm">Already have a resume? Upload it and manage it easily.</p>
          </div>
  
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">📈 Analytics</h3>
            <p className="text-gray-600 text-sm">Track resume views, downloads, and performance.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  