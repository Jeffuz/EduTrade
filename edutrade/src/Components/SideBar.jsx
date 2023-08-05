import React, { useState } from "react";

export default function SideBar() {
  return (

         <div className='flex justify-between max-w-[1500px] mx-auto px-4 pt-10'>
            <div className="w-1/5 flex flex-col gap-y-3"> {/* Add justify-end here */}
                <button className="py-2 px-4 text-gray-700 font-bold text-left border-4 hover:border-l-pink-500">
                    Home
                </button>
                <button className="py-2 px-4 text-gray-700 font-bold text-left border-4 hover:border-l-pink-500">
                    Shopping
                </button>
            </div>
         </div>
    
  );
}