import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center bg-gray-800 p-4 text-white">
      <div>
        <Link to="/">
          <h1>My Website</h1>
        </Link>
      </div>
      <div>
        <h1> This is a Navbar</h1>
      </div>
    </nav>
  );
};

export default Navbar;
