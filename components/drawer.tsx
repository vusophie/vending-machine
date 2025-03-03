'use client';
import { useState, useEffect, useRef } from 'react';

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Open the drawer
  const handleOpen = () => setIsOpen(true);

  // Close the drawer
  const handleClose = () => setIsOpen(false);

  // Close the drawer if the click is outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={drawerRef}
      className={`fixed top-1/2 transform -translate-y-1/2 right-0 w-[90vw] h-[70vh] shadow-xl transition-transform duration-300 rounded-l-xl ${
        isOpen ? 'translate-x-0 backdrop-blur-md' : 'translate-x-[95%] hover:translate-x-[90%]'
      }`}
      onClick={handleOpen} // Clicking the visible portion opens the drawer
    >
      <div className="p-6 h-full flex flex-col justify-start">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 transform rotate-90 rotate-180 origin-top-left">
            How to Use
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800 transition duration-300"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6">
          {/* You can add content here for the "How to Use" section */}
        </div>
      </div>
    </div>
  );
}
