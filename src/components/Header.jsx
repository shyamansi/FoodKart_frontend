import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({isAdmin}) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid">
      <a className="navbar-brand" href={isAdmin ? "/dashboard_admin" : "/dashboard_member"}>Foodmart</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/dashboard_admin">Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/add_product">Add Product</a>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-outline-light ms-3"
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/';
              }}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
