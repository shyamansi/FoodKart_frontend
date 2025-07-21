
import React from 'react';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoginPageForm from './components/LoginPageForm';
import EditProduct from './components/EditProduct';
import {lazy,Suspense} from 'react';
import RegistrationForm from './components/RegistrationForm';
import ProtectedRoute from './components/ProtectedRoute';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MemberDashboard from './components/MemberDashboard';

const DashboardAdmin = lazy(()=>import('./components/DashboardAdmin'))
function App() {
  console.log("shyammmmmmmadmin", localStorage.getItem('is_admin'));
  const isAdmin = localStorage.getItem('is_admin') === 'true';
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        setProducts([]);
      });
  }, []);
  return (
    <Router>
      <Suspense fallback={<div> Loading.... </div>}>
       <Routes>
  <Route path="/" element={<LoginPageForm />} />
  <Route path="/register" element={<RegistrationForm />} />
  {isAdmin && <Route path="/add_product" element={<AddProduct  isAdmin={isAdmin}/>} />}
  <Route path="/product_list" element={<ProductList   isAdmin={isAdmin}/>} />
  <Route path="/dashboard_admin" element={<ProtectedRoute><DashboardAdmin /></ProtectedRoute>} />
  <Route path="/dashboard_member" element={<ProtectedRoute><MemberDashboard products={products} isAdmin={isAdmin}/></ProtectedRoute>} />
  <Route path="/update_product/:id" element={<EditProduct isAdmin={isAdmin}/>} />
</Routes>
      </Suspense>
    </Router>
  );
}

export default App;
