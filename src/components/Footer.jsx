import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => (
  <footer className="bg-primary text-white text-center py-3 mt-auto">
    <div className="container">
      <span>&copy; {new Date().getFullYear()} Foodmart. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
