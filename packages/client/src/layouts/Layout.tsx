
import { Footer } from '@/layouts/Footer';
import { TopHeader } from '@/layouts/TopHeader';
import { LayoutInterface } from '@/layouts/types';
import React from 'react'

const Layout: React.FC<LayoutInterface> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden sm:py-12">
      <TopHeader />
      <div className="md:container md:mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
