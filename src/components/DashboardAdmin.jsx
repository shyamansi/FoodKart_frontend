import React from "react";
import { useNavigate} from "react-router-dom";
const DashboardAdmin = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    if (!isAdmin) {
      navigate('/dashboard_member');
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    console.log("shyammmmmdashboard", localStorage.removeItem('token'));
    navigate('/');
  };

  return (
   <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
       <div className="container-fluid">
         <a className="navbar-brand d-flex align-items-center" href="/">
           <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 10 }}>
             <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="18" cy="18" r="18" fill="#28a745" />
               <rect x="10" y="16" width="16" height="8" rx="2" fill="#fff" />
               <rect x="13" y="12" width="10" height="6" rx="2" fill="#ffc107" />
               <circle cx="14.5" cy="20" r="1.5" fill="#28a745" />
               <circle cx="21.5" cy="20" r="1.5" fill="#28a745" />
             </svg>
           </span>
           <span>Foodmart Admin</span>
         </a>
         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse" id="navbarNav">
           <ul className="navbar-nav ms-auto">
             <li className="nav-item">
               <a className="nav-link" href="/add_product">Add Product</a>
             </li>
             <li className="nav-item">
               <a className="nav-link" href="/product_list">List Product</a>
             </li>
             <li className="nav-item">
               <button className="btn btn-outline-light ms-3" onClick={handleSignOut}>Sign Out</button>
             </li>
           </ul>
         </div>
       </div>
     </nav>

     <div className="container py-5">
       <div className="row mb-4">
         <div className="col-12 text-center">
           <h1 className="fw-bold text-primary mb-3">Welcome to Foodmart Admin Dashboard</h1>
           <p className="lead text-secondary">Manage your products, view stats, and take quick actions with a modern, e-commerce inspired interface.</p>
         </div>
       </div>
       <div className="row g-4 mb-5 justify-content-center">
         <div className="col-12 col-md-4">
           <div className="card shadow border-0">
             <div className="card-body text-center">
               <h5 className="card-title text-success fw-bold">Total Products</h5>
               <p className="display-6 fw-bold mb-0">128</p>
             </div>
           </div>
         </div>
         <div className="col-12 col-md-4">
           <div className="card shadow border-0">
             <div className="card-body text-center">
               <h5 className="card-title text-info fw-bold">Active Categories</h5>
               <p className="display-6 fw-bold mb-0">8</p>
             </div>
           </div>
         </div>
         <div className="col-12 col-md-4">
           <div className="card shadow border-0">
             <div className="card-body text-center">
               <h5 className="card-title text-warning fw-bold">Pending Orders</h5>
               <p className="display-6 fw-bold mb-0">23</p>
             </div>
           </div>
         </div>
       </div>
       <div className="row justify-content-center">
         <div className="col-12 col-md-8">
           <div className="card shadow-lg border-0">
             <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
               <div className="mb-3 mb-md-0">
                 <h4 className="fw-bold text-primary mb-2">Quick Actions</h4>
                 <p className="text-secondary mb-0">Add new products, view product list, or manage categories instantly.</p>
               </div>
               <div>
                 <a href="/add_product" className="btn btn-success me-2">Add Product</a>
                 <a href="/product_list" className="btn btn-info me-2">View Products</a>
                 <a href="#" className="btn btn-warning">Manage Categories</a>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>

     <footer className="bg-primary text-white text-center py-3 mt-auto">
       <div className="container">
         <span>&copy; {new Date().getFullYear()} Foodmart. All rights reserved.</span>
       </div>
     </footer>
   </div>

  );
};

export default DashboardAdmin;
