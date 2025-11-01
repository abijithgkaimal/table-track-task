import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImg from '../../assets/1.webp';

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen  text-center p-6">
      <img  src={NotFoundImg}  alt="Page Not Found"  className="w-72 md:w-96 mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-200"
      >
        Go Home
      </Link>
    </div>
  );
}
