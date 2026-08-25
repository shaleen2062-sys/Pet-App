import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { API_BASE } from "../api";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (validationErrors.email || validationErrors.password) {
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(`${API_BASE}/auth/register`, {
        email: form.email,
        password: form.password,
      });

      navigate("/login");
    } catch (err) {
      if (err.response) {
        const message = err.response.data.message || "Registration failed.";

        if (
          message.toLowerCase().includes("user") ||
          message.toLowerCase().includes("email")
        ) {
          setErrors({
            email: message,
            password: "",
          });
        } else {
          setErrors({
            email: "",
            password: message,
          });
        }
      } else {
        setErrors({
          email: "",
          password: "Could not reach the server. Is the backend running?",
        });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="pixel-auth-page">
      <div className="pixel-cloud pixel-cloud-1"></div>
      <div className="pixel-cloud pixel-cloud-2"></div>

      <div className="pixel-auth-container">
        <div className="pixel-top-decoration">♡ ♡ ♡</div>

        <div className="pixel-auth-header">
          <h1 className="pixel-title">
            PET
            <br />
            CONTROLLER
          </h1>

          <p className="pixel-subtitle">CREATE YOUR PIXEL PET WORLD</p>
        </div>

        <div className="pixel-pet-scene">
          <div className="pixel-sun">☀</div>
          <div className="pixel-pet">🐱</div>
          <div className="pixel-heart">♥</div>
          <div className="pixel-ground-line"></div>
        </div>

        <section className="pixel-login-section">
          <div className="pixel-section-label">
            <span>NEW PET OWNER</span>
          </div>

          <h2 className="pixel-login-title">REGISTER</h2>

          <p className="pixel-login-description">
            CREATE YOUR ACCOUNT TO
            <br />
            START YOUR PET JOURNEY
          </p>

          <form className="pixel-login-form" onSubmit={handleSubmit} noValidate>
            <div className="pixel-form-row">
              <label className="pixel-form-label" htmlFor="email">
                EMAIL
              </label>

              <input
                id="email"
                name="email"
                type="email"
                className="pixel-form-input"
                placeholder="ENTER YOUR EMAIL"
                value={form.email}
                onChange={handleChange}
              />

              {errors.email && (
                <p className="pixel-field-error">{errors.email}</p>
              )}
            </div>

            <div className="pixel-form-row">
              <label className="pixel-form-label" htmlFor="password">
                PASSWORD
              </label>

              <input
                id="password"
                name="password"
                type="password"
                className="pixel-form-input"
                placeholder="CREATE A PASSWORD"
                value={form.password}
                onChange={handleChange}
              />

              {errors.password && (
                <p className="pixel-field-error">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="pixel-login-button"
              disabled={submitting}
            >
              {submitting ? "REGISTERING..." : "REGISTER"}
            </button>
          </form>

          <div className="pixel-auth-switch">
            <span>ALREADY A PET OWNER?</span>

            <Link to="/login">LOGIN →</Link>
          </div>
        </section>

        <div className="pixel-bottom-scene">
          <div className="pixel-city">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="pixel-water">
            <div className="pixel-wave"></div>
            <div className="pixel-wave"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
