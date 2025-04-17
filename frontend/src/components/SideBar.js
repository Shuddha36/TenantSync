import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-100 p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">TenantSync</h2>
      <ul className="space-y-3">
        <li><Link to="/login" className="hover:text-blue-600">Login / Sign up</Link></li>
        <li><Link to="/profile" className="hover:text-blue-600">Tenant Dashboard</Link></li>
        <li><Link to="/owner-dashboard" className="hover:text-blue-600">Owner Dashboard</Link></li>
        <li><Link to="/" className="hover:text-blue-600">Property</Link></li>
        <li><a href="#" className="hover:text-blue-600">Maintainer</a></li>
        <li><a href="#" className="hover:text-blue-600">Contacts</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;