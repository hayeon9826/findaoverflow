'use client';
import React, { useState } from 'react';

function NavigationMenu() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      className="ml-3 inline-flex items-center rounded-lg px-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-100 md:hidden"
      aria-controls="navbar-default"
      aria-expanded="false"
      onClick={() => setOpen(!open)}
    >
      <span className="sr-only">Open main menu</span>
      {open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      )}
    </button>
  );
}

export default NavigationMenu;
