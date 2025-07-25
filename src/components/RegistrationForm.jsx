
import { useState } from 'react';
import { Link ,useNavigate} from "react-router-dom";
const RegistrationForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
   const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState(null);
  const registerSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    // Validation
    if (!form.email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!form.password) {
      setError('Password is required.');
      return;
    }
    if (!form.password_confirmation) {
      setError('Password confirmation is required.');
      return;
    }
    if (form.password !== form.password_confirmation) {
      setError('Passwords do not match.');
      return;
    }
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user: form }),
    })
      .then(async (res) => {
        const data = await res.json();
        const token = res.headers.get("Authorization");

        if (res.ok && token) {
          localStorage.setItem("jwt", token);
          alert("User registered!");
          navigate("/"); 
        } else {
          setError(data.errors ? data.errors.join(', ') : 'Registration failed.');
        }
      })
      .catch((err) => {
        setError('API error: ' + err.message);
      });
  };
  return (
    <section className="vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-9">
            <div className="card shadow-lg border-0" style={{ borderRadius: 30 }}>
              <div className="row g-0 align-items-center">
                <div className="col-md-6 px-5 py-5">
                  <div className="text-center mb-4">
                    <img src="/images/logo.png" alt="Foodmart Logo" style={{ width: 80 }} />
                    <h2 className="fw-bold text-primary mt-3 mb-1">Create Account</h2>
                    <p className="text-muted">Sign up to get started</p>
                  </div>
                  {error && <div className="alert alert-danger text-center">{error}</div>}
                  <form onSubmit={registerSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        id="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label fw-semibold">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        id="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password_confirmation" className="form-label fw-semibold">Confirm Password</label>
                      <input
                        type="password"
                        name="password_confirmation"
                        className="form-control form-control-lg"
                        id="password_confirmation"
                        placeholder="Confirm your password"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-check d-flex justify-content-center mb-4">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="terms"
                        required
                      />
                      <label className="form-check-label" htmlFor="terms">
                        I agree to all statements in <a href="#!">Terms of service</a>
                      </label>
                    </div>
                    <div className="d-grid gap-2 mb-3">
                      <button type="submit" className="btn btn-primary btn-lg">Register</button>
                    </div>
                  </form>
                  <div className="mt-3 text-center">
                    <span className="text-muted">Already registered? </span>
                    <Link to="/" className="fw-bold text-primary">Sign in here</Link>
                  </div>
                </div>
                <div className="col-md-6 d-none d-md-block text-center">
                  <img
                    src="/images/img-login.jpg"
                    alt="Foodmart visual"
                    className="img-fluid rounded-end"
                    style={{ maxHeight: 420, objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistrationForm
