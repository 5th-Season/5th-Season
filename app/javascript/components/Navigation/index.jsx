import React, { useEffect, useRef, useState } from 'react'

const Navigation = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-2">
          <span className="font-bold text-lg">FASHIONISTA</span>
      </div>
      
      <nav className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-black">Discover</a>
          <a href="/collaborate" className="text-gray-600 hover:text-black">Collaborate</a>
          <a href="/launches" className="text-gray-600 hover:text-black">Launches</a>
      </nav>
      
      <div className="flex space-x-4">
          <a href="#" className="px-4 py-2 text-gray-600 border border-black rounded hover:bg-gray-100">SIGN IN</a>
          <a href="#" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">CREATE ACCOUNT</a>
      </div>
    </header>
  )
}

export default Navigation;