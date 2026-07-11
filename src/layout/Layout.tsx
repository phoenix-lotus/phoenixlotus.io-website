import type { ReactNode } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import Grain from '@/components/Grain'
import ScrollProgress from '@/components/ScrollProgress'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-grad-phoenix focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <Grain />
    </>
  )
}
