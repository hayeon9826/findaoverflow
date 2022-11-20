import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="container mx-auto flex flex-col flex-wrap items-center justify-between bg-white p-6 sm:flex-row md:flex-row">
      <a
        href="https://finda.co.kr"
        target="_blank"
        className="mb-2 flex items-center font-medium text-gray-900 md:mb-0"
        rel="noreferrer"
      >
        <Image
          src="https://cdn.finda.co.kr/images/favicon/finda_192.png"
          alt="Finda Logo"
          width={18}
          height={18}
        />
        <span className="ml-1 text-sm font-semibold text-gray-900">
          findaoverflow
        </span>
      </a>
      <p className="text-xs text-gray-400 lg:text-sm">
        © Copyright 2022. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
