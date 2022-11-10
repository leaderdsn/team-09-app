import { TopHeader } from '@/components/Header/TopHeader'
import { Footer } from '@/components/Footer/Footer'
import { LayoutInterface } from './types';

const Layout = ({children}: LayoutInterface) => {
  return(
    <div className="relative flex min-h-screen flex-col overflow-hidden sm:py-12">
      <TopHeader />
      <div className="md:container md:mx-auto">
        {children}
      </div>
      <Footer />
    </div>
  )
};

export default Layout;
