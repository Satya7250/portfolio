import React from 'react';
import { ModeToggle } from '../ui/mode-toggle';

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <ModeToggle />
      </div>
    </footer>
  );
};

export default Footer;
