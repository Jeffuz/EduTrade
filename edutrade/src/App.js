import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './Context/AuthContext';

import AboutUsPage from './Pages/About Us Page';
import ContactUsPage from './Pages/Contact Us Page';
import ForumPage from './Pages/Forum Page';
import HomePage from './Pages/Home Page';
import SignupPage from './Pages/Signup Page';
import NoPage from './Pages/No Page';
import ProductDetailsPage from './Pages/Product Details Page';
import ProductListingsPage from './Pages/Product Listings Page';
import ShoppingCartPage from './Pages/Shopping Cart Page';
import ThreadPage from './Pages/Thread Page';
import UserProfilePage from './Pages/User Profile Page';
import LoginPage from './Pages/Login Page';
import NavBar from './Components/NavBar';
import Protected from './Components/Protected';
import Footer from './Components/Footer';
import Message from './Pages/Message Page';
import CreateListingPage from './Pages/Create Listing Page';
import ChatSidebar from './Components/ChatSidebar';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <NavBar />
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
          <Route path="/userprofile" element={<Protected><UserProfilePage /></Protected>} />
          <Route path="/message/:chatRoomId" element={<Protected><Message /></Protected>} />
          <Route path="*" element={<NoPage />} />
          <Route path="/post/:postId" element={< ThreadPage />} />
          <Route path="/createlisting" element={<CreateListingPage />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
