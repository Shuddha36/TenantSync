import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages and components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;