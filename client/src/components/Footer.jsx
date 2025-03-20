const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-10 px-4 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">DxResumee</h3>
            <p className="text-sm text-gray-300">Helping you craft professional resumes with ease and style.</p>
          </div>
  
          <div>
            <h4 className="font-medium mb-2">Resources</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li><a href="#">Resume Templates</a></li>
              <li><a href="#">Cover Letter</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>
  
          <div>
            <h4 className="font-medium mb-2">Company</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
  
          <div>
            <h4 className="font-medium mb-2">Subscribe</h4>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-lg text-black"
              />
              <button type="submit" className="bg-blue-600 w-full py-2 rounded-lg font-semibold hover:bg-blue-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-8">
          © {new Date().getFullYear()} DxResumee. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  