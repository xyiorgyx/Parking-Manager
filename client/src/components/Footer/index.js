import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="block bottom-0 left-0 right-0 bg-gradient-to-b from-gray-700 to-neutral-900 text-white  py-4">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2023 Parking Lot Manager</p>
        <ul className="flex m-4">
         
          <li><Link to="/contactUs">Contact Us</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;