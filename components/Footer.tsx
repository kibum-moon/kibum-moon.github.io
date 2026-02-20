import React from 'react';
import { PROFILE_DATA } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-bg-dark border-t border-accent/20 text-text-secondary">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-base">
        <p>&copy; {currentYear} {PROFILE_DATA.name}. All Rights Reserved.</p>
        <p className="mt-2">
            <a href="#home" className="hover:text-accent transition-colors">Back to Top &uarr;</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;