import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Ensure cookies are sent with requests
axios.defaults.withCredentials = true;

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // For error messages
  const [welcome, setWelcome] = useState(""); // For welcome message
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (error) setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hardcoded admin check
    if (form.email === "admin" && form.password === "admin") {
      setWelcome("Welcome, Admin");
      setTimeout(() => {
        setWelcome("");
        navigate("/admin");
      }, 1000);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("The email address is not valid");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        form
      );
      console.log("Login response:", res.data);
      setWelcome(`Welcome, ${res.data.user.username}`);
      // localStorage.setItem("myKey", res.data.user.id);
      setUser(res.data.user);
      setTimeout(() => {
        setWelcome("");
        // Check role and redirect accordingly
        if (res.data.user.role === "Owner") {
          navigate("/owner-dashboard");
        } else if (res.data.user.role === "Tenant") {
          navigate("/");
        } else {
          navigate("/admin");
        }
      }, 1000);
    } catch (err) {
      const errMsg =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message.toLowerCase()
          : "";
      if (errMsg.includes("password")) {
        setError("Give the correct password");
      } else if (
        errMsg.includes("not registered") ||
        errMsg.includes("no user")
      ) {
        setError("This email is not registered");
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 16px",
        position: "relative",
      }}
    >
      {/* Floating Error Message */}
      {error && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            fontSize: "14px",
            zIndex: "1000",
          }}
        >
          {error}
        </div>
      )}

      {/* Floating Welcome Message */}
      {welcome && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            fontSize: "14px",
            zIndex: "1000",
          }}
        >
          {welcome}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "320px",
            color: "#000",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              marginBottom: "24px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Login
          </h2>

          <div style={{ marginBottom: "16px" }}>
            <input
              name="email"
              onChange={handleChange}
              placeholder="Email"
              style={{
                width: "80%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
                transition: "border 0.3s",
                color: "#000",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              style={{
                width: "80%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
                transition: "border 0.3s",
                color: "#000",
              }}
            />
          </div>

          {/* Button Container */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={{
                width: "30%",
                padding: "10px",
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "9999px",
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
            >
              Login
            </button>
          </div>
        </form>

        {/* Registration Redirect Text */}
        <p
          style={{
            color: "#fff",
            fontSize: "14px",
            marginTop: "16px",
          }}
        >
          Did not sign up yet? then{" "}
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              color: "#fff",
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
