import React from "react";

const MemberDashboard = ({ products,isAdmin }) => {
  const navigate = window.location ? (path) => { window.location.href = path; } : () => {};
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('member_cart');
    navigate('/');
  };
  const [cart, setCart] = React.useState(() => {
    const saved = localStorage.getItem('member_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCart, setShowCart] = React.useState(false);
  const [allProducts, setAllProducts] = React.useState(products );

  React.useEffect(() => {
    if (!products || products.length === 0) {
      fetch('http://localhost:3000/products')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch products');
          return res.json();
        })
        .then((data) => {   
          setAllProducts(data);
        })
        .catch(() => {
          setAllProducts([]);
        });
    } else {
      setAllProducts(products);
    }
  }, [products]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem('member_cart', JSON.stringify(updatedCart));
  };

  const decreaseCartQty = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.id !== productId || item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem('member_cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('member_cart', JSON.stringify(updatedCart));
  };

  const handleCartClick = () => {
    setShowCart(true);
  };
  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href={isAdmin ? "/dashboard_admin" : "/dashboard_member"}>
            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 10 }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="#28a745" />
                <rect x="10" y="16" width="16" height="8" rx="2" fill="#fff" />
                <rect x="13" y="12" width="10" height="6" rx="2" fill="#ffc107" />
                <circle cx="14.5" cy="20" r="1.5" fill="#28a745" />
                <circle cx="21.5" cy="20" r="1.5" fill="#28a745" />
              </svg>
            </span>
            <span>Foodmart Member</span>
          </a>
          <div className="d-flex align-items-center ms-auto">
            <button
              className="btn btn-outline-light d-flex align-items-center me-2"
              style={{ position: 'relative' }}
              onClick={handleCartClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .485.379L2.89 6H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 15H4a.5.5 0 0 1-.491-.408L1.01 2H.5a.5.5 0 0 1-.5-.5zm3.14 5l1.25 6h7.22l1.25-6H3.14z"/>
              </svg>
              <span className="ms-2">Cart</span>
              {cart.length > 0 && (
                <span className="badge bg-danger ms-2" style={{ position: 'absolute', top: '-8px', right: '-8px' }}>{cart.length}</span>
              )}
            </button>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h1 className="fw-bold text-primary mb-3">Welcome to Foodmart Member Dashboard</h1>
            <p className="lead text-secondary">Browse and shop from our latest products. Enjoy a seamless experience designed for valued members.</p>
          </div>
        </div>
        <div className="row justify-content-center">
          {allProducts && allProducts.length > 0 ? (
            allProducts.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card shadow-lg h-100 border-0">
                  <div className="card-body">
                    {product.image_url && (
                      <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '10px', borderRadius: '8px' }} />
                    )}
                    <h5 className="card-title text-primary fw-bold">{product.name}</h5>
                    <p className="card-text mb-1"><strong>Price:</strong> ₹{product.price}</p>
                    <p className="card-text"><strong>Category:</strong> {product.category_name}</p>
                  </div>
                  <div className="card-footer bg-white border-0 text-center">
                    {(() => {
                      const cartItem = cart.find((item) => item.id === product.id);
                      if (!cartItem) {
                        return (
                          <button className="btn btn-success btn-sm" onClick={() => addToCart(product)}>
                            Add to Cart
                          </button>
                        );
                      } else {
                        return (
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <button className="btn btn-outline-danger btn-sm" onClick={() => decreaseCartQty(product.id)}>-</button>
                            <span className="fw-bold">{cartItem.quantity || 1}</span>
                            <button className="btn btn-outline-success btn-sm" onClick={() => addToCart(product)}>+</button>
                          </div>
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-info text-center my-5" role="alert">
              No products found.
            </div>
          )}
        </div>

        {showCart && (
          <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Your Cart</h5>
                  <button type="button" className="btn-close" onClick={handleCloseCart}></button>
                </div>
                <div className="modal-body">
                  {cart.length === 0 ? (
                    <div className="alert alert-info text-center">Your cart is empty.</div>
                  ) : (
                    <ul className="list-group">
                      {cart.map((item) => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                          <span>
                            <strong>{item.name}</strong> <span className="text-secondary">(₹{item.price})</span>
                            <span className="badge bg-primary ms-2">Qty: {item.quantity || 1}</span>
                          </span>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseCart}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <footer className="bg-primary text-white text-center py-3 mt-auto">
        <div className="container">
          <span>&copy; {new Date().getFullYear()} Foodmart. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default MemberDashboard;
