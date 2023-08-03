import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AboutUsPage from './Pages/About Us Page';
import ContactUsPage from './Pages/Contact Us Page';
import ForumPage from './Pages/Forum Page';
import HomePage from './Pages/Home Page';
import LoginPage from './Pages/Login Page';
import SignupPage from './Pages/Signup Page';
import NoPage from './Pages/No Page';
import ProductDetailsPage from './Pages/Product Details Page';
import ProductListingsPage from './Pages/Product Listings Page';
import ShoppingCartPage from './Pages/Shopping Cart Page';
import ThreadPage from './Pages/Thread Page';
import UserProfilePage from './Pages/User Profile Page';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/" element={< HomePage />} />
          <Route path="/aboutus" element={< AboutUsPage />} />
          <Route path="/contactus" element={< ContactUsPage />} />
          <Route path="/forum" element={< ForumPage />} />
          <Route path="/login" element={< LoginPage />} />
          <Route path="/signup" element={< SignupPage />} />
          <Route path="/productdetails" element={< ProductDetailsPage />} />
          <Route path="/productlistings" element={< ProductListingsPage />} />
          <Route path="/shoppingcart" element={< ShoppingCartPage />} />
          <Route path="/thread" element={< ThreadPage />} />
          <Route path="/userprofile" element={< UserProfilePage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
