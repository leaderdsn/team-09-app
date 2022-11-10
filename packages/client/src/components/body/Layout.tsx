import { TopHeader } from '../Header/TopHeader'
import { Footer } from '../Footer/Footer'
import { LayoutInterface } from './types';

export const Layout = ({children}: LayoutInterface) => {
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