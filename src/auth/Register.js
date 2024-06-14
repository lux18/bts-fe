import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://94.74.86.174:8080/api/register",
        formData,
      );
      setMessage(response.data.message);
      navigate(`/login`);
    } catch (error) {
      setMessage(error.response.data.errorMessage);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="card p-3 px-4 w-100" style={{ maxWidth: "400px" }}>
        <h1 className="mb-4">Formulir Pendaftaran</h1>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              className={`form-control ${errors.email && "is-invalid"}`}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              className={`form-control ${errors.username && "is-invalid"}`}
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              className={`form-control ${errors.password && "is-invalid"}`}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100">
            Daftar
          </button>
          <br />
          <br />
          <button
            onClick={() => navigate(-1)}
            type="submit"
            className="btn btn-secondary w-100"
          >
            Kembali
          </button>

          <br />
          <br />
          {message && (
            <div
              className="alert alert-success"
              style={{ textTransform: "capitalize" }}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
