import { TopHeader } from '../header/TopHeader'
import { Footer } from '../footer/Footer'
import React, { ReactNode } from 'react'

export interface LayoutInterface {
  children: ReactNode
}

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