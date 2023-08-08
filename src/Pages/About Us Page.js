import React from "react";
import { motion } from 'framer-motion';

export default function About_Us_Page() {
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
            <div className="container mx-auto py-[10%] mb-[10.75%] px-4">
                <div className="text-center mb-[5%]">
                    <h2 className="text-3xl font-bold">Mission</h2>
                    <p className="text-gray-600 mt-4">
                        At EduTrade, our mission is to provide an educational environment for learners and educators. We believe that everyone should have access to education and opportunities for continuous learning, irrespective of geographical boundaries or economic constraints. By creating a dynamic marketplace for buying and selling educational resources, we aim to foster a community where learners can find the resources they need to excel, and educators can share their expertise with the world. Our mission is to bridge the gap between learners and educators, creating a platform that inspires curiosity, drives growth, and transforms lives through education.                </p>
                </div>
            </div>
        </motion.div>
    )
}