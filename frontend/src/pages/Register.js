import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "tenant", // default role
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (error) setError("");
    if (success) setSuccess("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setSuccess("Registered successfully! Now, login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.message.toLowerCase().includes("email is already registered")
      ) {
        setError("Email is already registered.");
      } else {
        alert("Error registering. Please try again.");
      }
    }
  };

  return (
    <>
      {error && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#000",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "0 0 4px 4px",
            zIndex: 9999,
            fontSize: "16px",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#000",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "0 0 4px 4px",
            zIndex: 9999,
            fontSize: "16px",
          }}
        >
          {success}
        </div>
      )}

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#fff",
              padding: "32px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "320px",
              color: "#000",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                marginBottom: "20px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Register
            </h2>

            <div style={{ marginBottom: "16px" }}>
              <input
                name="name"
                onChange={handleChange}
                placeholder="Username"
                style={{
                  width: "80%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border 0.3s",
                  color: "#000",
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <input
                name="email"
                onChange={handleChange}
                placeholder="Email"
                style={{
                  width: "80%",
                  padding: "10px",
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
                  padding: "10px",
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
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                style={{
                  width: "85%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none",
                  color: "#000",
                }}
              >
                <option value="tenant">Tenant</option>
                <option value="owner">Owner</option>
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                style={{
                  width: "30%",
                  padding: "8px",
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
                Sign Up
              </button>
            </div>
          </form>

          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#fff",
              marginTop: "16px",
            }}
          >
            If you already register? then{" "}
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
