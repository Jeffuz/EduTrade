import React from "react";
import { useForm } from '@formspree/react';
import { motion } from 'framer-motion';

export default function Contact_Us_Page() {
    const [state, handleSubmit] = useForm("moqojryo");

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="container mx-auto py-8 px-4 my-[5.3%]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:pr-4">
                        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                        <p className="mb-2">
                            If you have any questions or inquiries, please feel free to get in touch with us.
                        </p>
                        <p className="mb-4">You can contact us via email</p>

                        <h3 className="text-xl font-bold mb-2">Email:</h3>
                        <p className="mb-4">
                            <a href="mailto:contact@example.com" className="text-blue-500 hover:underline">
                                EduTrade25@gmail.com
                            </a>
                        </p>
                    </div>
                    <div>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
                            <form onSubmit={handleSubmit}>
                                {/* Name */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Name
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                {/* Email */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>
                                {/* Message */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none h-32"
                                        placeholder="Your Message"
                                        required
                                    />
                                </div>
                                {/* Button */}
                                <div className="flex justify-center">
                                    <button
                                        type='submit'
                                        className='bg-white text-black hover:bg-gray-50 duration-300 ease-in-out shadow-lg w-[200px] rounded-md font-medium my-6 px-6 py-3'
                                        disabled={state.submitting}
                                    >
                                        {state.submitting ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
