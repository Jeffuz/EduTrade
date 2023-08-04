import React from 'react';
import { SiFacebook, SiTwitter, SiInstagram, SiLinkedin } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-4 items-center">
                <div className="text-center md:text-left">
                    <Link to="/" className="font-bold text-lg">EduTrade</Link>
                </div>
                <div className="flex items-center justify-center md:justify-center space-x-4">
                    <Link to="/" className="hover:text-gray-500">
                        Home
                    </Link>
                    <Link to="/aboutus" className="hover:text-gray-500">
                        About Us
                    </Link>
                    <Link to="/contactus" className="hover:text-gray-500">
                        Contact
                    </Link>
                </div>

                <div className="flex justify-center md:justify-end space-x-4">
                    <a href="/">
                        <SiFacebook className="text-xl hover:text-gray-500" />
                    </a>
                    <a href="/">
                        <SiTwitter className="text-xl hover:text-gray-500" />
                    </a>
                    <a href="/">
                        <SiInstagram className="text-xl hover:text-gray-500" />
                    </a>
                    <a href="/">
                        <SiLinkedin className="text-xl hover:text-gray-500" />
                    </a>
                </div>
            </div>

            <div className="text-center mt-4">
                <p>&copy; {currentYear} EduTrade. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
