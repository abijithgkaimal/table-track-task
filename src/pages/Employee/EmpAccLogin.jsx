import React from 'react'

function EmpAccLogin() {
  return (
    <>
     <div  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed p-6"  style={{    backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="bg-[#a97b56] rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">
           Login
        </h2>
        

        <form  className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-white text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input id="email" type="text" placeholder="username"  autoComplete="new-email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input id="password" type="password" placeholder="Enter password"  autoComplete="new-password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-600 focus:outline-none"
            />
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>

    
    </>
  )
}

export default EmpAccLogin