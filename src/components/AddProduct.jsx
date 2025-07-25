import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const AddProduct = ({isAdmin}) => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    name: '',
    price: '',
    category_name: '',
    image: ''
  });
   const [imagePreview, setImagePreview] = useState(null); // <-- Add this
   const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

 const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setFormdata((prev) => ({ ...prev, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0])); // <-- Set preview
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    // Validation
    if (!formdata.name.trim()) {
      setError('Product name is required.');
      return;
    }
    if (!formdata.price || isNaN(formdata.price) || Number(formdata.price) <= 0) {
      setError('Valid price is required.');
      return;
    }
    if (!formdata.category_name.trim()) {
      setError('Category is required.');
      return;
    }
    if (!formdata.image) {
      setError('Product image is required.');
      return;
    }
    setAdding(true);
    const formDataObj = new FormData();
    formDataObj.append('product[name]', formdata.name);
    formDataObj.append('product[price]', formdata.price);
    formDataObj.append('product[category_name]', formdata.category_name);
      formDataObj.append('product[image]', formdata.image);
    // if (formdata.image) {
    //   formDataObj.append('product[image]', formdata.image_url);
    // }
    console.log("sinhhhhhhhhhhshyammmmmmm", formDataObj);
    fetch('http://localhost:3000/add_products', {
      method: 'POST',
      body: formDataObj,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to save');
        return res.json();
      })
      .then((data) => {
        alert('Product added successfully');
        navigate('/dashboard_admin');
        setFormdata({ name: '', price: '', category_name: '', image: '' });
        setAdding(false);
      })
      .catch((err) => {
        setError(err.message);
        setAdding(false);
      });
  };

  return (
    <>
      <Header isAdmin={isAdmin}/>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card shadow-lg border-0" style={{ borderRadius: 20 }}>
              <div className="card-body p-4">
                <h3 className="text-center text-primary fw-bold mb-4">Add Product</h3>
                {error && (
                  <div className="alert alert-danger text-center" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      id="name"
                      placeholder="Enter product name"
                      value={formdata.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label fw-semibold">Price</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control form-control-lg"
                      id="price"
                      placeholder="Enter product price"
                      value={formdata.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category_name" className="form-label fw-semibold">Category</label>
                    <input
                      type="text"
                      name="category_name"
                      className="form-control form-control-lg"
                      id="category_name"
                      placeholder="Enter category"
                      value={formdata.category_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label fw-semibold">Image</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control form-control-lg"
                      id="image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                     {imagePreview && (
                      <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', marginTop: 10, borderRadius: 8 }} />
                    )}
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={adding}>
                      {adding ? 'Adding...' : 'Add Product'}
                    </button>
                  </div>
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

export default AddProduct;
