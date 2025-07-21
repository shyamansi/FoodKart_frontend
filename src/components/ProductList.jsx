import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = ({isAdmin}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        console.log("myimagedata" ,data)
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = (product) => {
    navigate(`/update_product/${product.id}`);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to delete product');
          return res.json();
        })
        .then(() => {
          setProducts((prev) => prev.filter((p) => p.id !== productId));
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header/Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 10 }}>
              {/* SVG Foodmart Icon */}
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="#28a745" />
                <rect x="10" y="16" width="16" height="8" rx="2" fill="#fff" />
                <rect x="13" y="12" width="10" height="6" rx="2" fill="#ffc107" />
                <circle cx="14.5" cy="20" r="1.5" fill="#28a745" />
                <circle cx="21.5" cy="20" r="1.5" fill="#28a745" />
              </svg>
            </span>
        
          </a>
            <a className="navbar-brand" href={isAdmin ? "/dashboard_admin" : "/dashboard_member"}>Foodmart</a>
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

      {/* Main Content */}
      <div className="container py-5">
        <h2 className="text-center mb-4 text-primary fw-bold">Product List</h2>
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center my-5" role="alert">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="alert alert-info text-center my-5" role="alert">
            No products found.
          </div>
        ) : (
          <div className="row justify-content-center">
            {products.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    {product.image_url && (
  <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '10px', borderRadius: '8px' }} />
)}
                    <h5 className="card-title text-primary fw-bold">{product.name}</h5>
                    <p className="card-text mb-1"><strong>Price:</strong> ₹{product.price}</p>
                    <p className="card-text"><strong>Category:</strong> {product.category_name}</p>
                  </div>
                  <div className="card-footer bg-white border-0 d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(product)}
                      title="Edit"
                    >
                      <EditIcon fontSize="small" /> Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(product.id)}
                      title="Delete"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-auto">
        <div className="container">
          <span>&copy; {new Date().getFullYear()} Foodmart. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default ProductList;
