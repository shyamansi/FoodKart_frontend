import React, { useState } from 'react'
import { Link , useNavigate } from "react-router-dom";
import GoogleLoginButton from './GoogleLoginButton';
// import RegistrationForm from './RegistrationForm';
function LoginPageForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);

  const submitLogin = (e) => {
    e.preventDefault();
    setError(null);
    // Validation
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!pass) {
      setError('Password is required.');
      return;
    }
    fetch("http://localhost:3000/users/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: pass
        }
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login Failed");
        }
        const token = response.headers.get("Authorization");
        return response.json().then((data) => {
          localStorage.setItem("token", token);
          // For debugging: log the full response
          console.log("shyamloginpage", data);

          // Extract user info from nested response
          const user = data.data && data.data.data ? data.data.data : {};
          // Save is_admin flag
          if (typeof user.is_admin !== 'undefined') {
            localStorage.setItem('is_admin', user.is_admin ? 'true' : 'false');
          }
          // Save products if provided
          if (data.data && data.data.products) {
            localStorage.setItem('products', JSON.stringify(data.data.products));
          }
          // Route based on is_admin
          if (user.is_admin) {
            navigate('/dashboard_admin');
          } else {
            navigate('/dashboard_member');
          }
        });
      })
      .catch((error) => {
        setError("Login Failed: " + error.message);
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
                    <img src="/images/logo.png" alt="Hotel Booking Logo" style={{ width: 80 }} />
                    <h2 className="fw-bold text-primary mt-3 mb-1">Welcome Back!</h2>
                    <p className="text-muted">Sign in to your account</p>
                  </div>
                  {error && <div className="alert alert-danger text-center">{error}</div>}
                  <form onSubmit={submitLogin}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label fw-semibold">Password</label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="password"
                        placeholder="Enter your password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary btn-lg">Sign In</button>
                    </div>
                  </form>
                  <div className="mt-4 text-center">
                    <GoogleLoginButton />
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-muted">Don't have an account? </span>
                    <Link to="/register" className="fw-bold text-primary">Register here</Link>
                  </div>
                </div>
                <div className="col-md-6 d-none d-md-block text-center">
                  <img
                    src="/images/img-login.jpg"
                    alt="Login visual"
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


export default LoginPageForm


