import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProduct = ({isAdmin}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', category_name: '', image: '', image_url: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}/edit`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then((data) => {
        setProduct({
          name: data.name || '',
          price: data.price || '',
          category_name: data.category_name || ''
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setProduct((prev) => ({ ...prev, image: files[0], image_url: URL.createObjectURL(files[0]) }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    // Validation
    if (!product.name.trim()) {
      setError('Product name is required.');
      return;
    }
    if (!product.price || isNaN(product.price) || Number(product.price) <= 0) {
      setError('Valid price is required.');
      return;
    }
    if (!product.category_name.trim()) {
      setError('Category is required.');
      return;
    }
    // Image is optional for edit, but you can require it if needed:
    // if (!product.image && !product.image_url) {
    //   setError('Product image is required.');
    //   return;
    // }
    const formDataObj = new FormData();
    formDataObj.append('product[name]', product.name);
    formDataObj.append('product[price]', product.price);
    formDataObj.append('product[category_name]', product.category_name);
     formDataObj.append('product[image]', product.image);
   
    fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      body: formDataObj,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update product');
        return res.json();
      })
      .then(() => {
        setSuccess(true);
        setTimeout(() => navigate('/dashboard_admin'), 1500);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header isAdmin={isAdmin}/>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0">
              <div className="card-body">
                <h3 className="card-title text-center text-primary fw-bold mb-4">Edit Product</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">Product updated successfully!</div>}
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category_name"
                    value={product.category_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Image</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  {(product.image_url || product.image) && (
                    <img src={product.image_url || (typeof product.image === 'string' ? product.image : '')} alt="Preview" style={{ maxWidth: '100%', marginTop: 10 }} />
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">Update Product</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProduct;