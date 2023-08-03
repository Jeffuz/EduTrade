import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import About_Us_Page from './Pages/About Us Page';
import Contact_Us_Page from './Pages/Contact Us Page';
import Forum_Page from './Pages/Forum Page';
import Home_Page from './Pages/Home Page';
import Login_Page from './Pages/Login Page';
import Signup_Page from './Pages/Signup Page';
import No_Page from './Pages/No Page';
import Product_Details_Page from './Pages/Product Details Page';
import Product_Listings_Page from './Pages/Product Listings Page';
import Shopping_Cart_Page from './Pages/Shopping Cart Page';
import Thread_Page from './Pages/Thread Page';
import User_Profile_Page from './Pages/User Profile Page';

import { AuthContextProvider } from './Context/AuthContext';
import Protected from './Components/Protected';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home_Page />} />
            <Route path="/" element={< Home_Page />} />
            <Route path="/aboutus" element={< About_Us_Page />} />
            <Route path="/contactus" element={< Contact_Us_Page />} />
            <Route path="/forum" element={< Forum_Page />} />
            <Route path="/login" element={< Login_Page />} />
            <Route path="/signup" element={< Signup_Page />} />
            <Route path="/productdetails" element={< Product_Details_Page />} />
            <Route path="/productlistings" element={< Product_Listings_Page />} />
            <Route path="/shoppingcart" element={< Shopping_Cart_Page />} />
            <Route path="/thread" element={< Thread_Page />} />
            <Route path="/userprofile" element={<Protected>< User_Profile_Page /></Protected>} />
            <Route path="*" element={<No_Page />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
