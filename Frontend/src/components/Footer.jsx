import React from "react";
import { FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#1c1c1c] text-gray-300">
    
      <div className="bg-[#a97b56]
 py-10 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-full md:w-1/2">
            <img
              src="https://thumbs.dreamstime.com/b/fresh-raw-pork-neck-spices-wooden-board-closeup-ingredients-delicious-meat-meal-fresh-raw-pork-neck-spices-204583811.jpg"
              alt="Newsletter"
              className="rounded-lg shadow-lg w-full object-cover"
            />
           
          </div>

          <div className="w-full md:w-1/2">
            <h4 className="text-orange-500 font-semibold text-lg mb-1">
              📰 Newsletters
            </h4>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Get Our Every Single Menu Notification
            </h2>

            <div className="flex flex-wrap gap-3 text-sm text-gray-800 mb-4">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div> Regular Updates
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div> Weekly Updates
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div> Monthly Updates
              </span>
            </div>

            <form className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden max-w-md">
              <FaEnvelope className="ml-3 text-gray-500 text-lg" />
              <input type="email" placeholder="Enter your email" className="flex-grow px-3 py-2 outline-none text-gray-800"
              />
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 font-semibold transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

    
      <div className="max-w-6xl mx-auto py-14 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-700 mt-10">
      
        <div>
          <h3 className="text-2xl font-semibold text-white mb-3">Food Zone</h3>
          <p className="text-sm text-gray-400 mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-orange-500"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-500"><FaGithub /></a>
            <a href="#" className="hover:text-orange-500"><FaLinkedin /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Our Menus</h4>
         <Link>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Chicken Burger</li>
              <li >Brief Pizza</li>
              <li>Fresh Vegetable</li>
              <li>Sea Foods</li>
              <li>Desserts</li>
              <li>Cold Drinks</li>
            </ul>
         </Link>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Useful Links</h4>
        <Link>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>About Us</li>
              <li>Restaurant</li>
              <li>Our Chefs</li>
              <li>Testimonials</li>
              <li>Blogs</li>
              <li>FAQs</li>
            </ul>
        </Link>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact Us</h4>
       <Link>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2"><MdPhone /> +44 0985 124 765</li>
              <li className="flex items-center gap-2"><MdPhone /> +44 0941 432 543</li>
              <li>afsal5997@gmail.com</li>
           
            </ul>
       </Link>

        
          
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
        © 2025 Food Zone | Built with  using React & Tailwind CSS
      </div>
    </footer>
  );
}

export default Footer;
