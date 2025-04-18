import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = ({ user }) => {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register"];
  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="flex flex-row justify-between items-center bg-black p-4 text-white shadow-md">
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-gray-300">
          TenantSync
        </Link>
      </div>
      <div className="flex space-x-4">
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <Link to="/tenant-dashboard" className="hover:text-gray-300">
              Profile
            </Link>
          </>
        ) : (
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
