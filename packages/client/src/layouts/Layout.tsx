
import { Footer } from '@/components/Footer/Footer';
import { TopHeader } from '@/components/Header/TopHeader';
import { LayoutInterface } from '@/layouts/types';

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
