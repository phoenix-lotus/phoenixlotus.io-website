import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'

const Services = lazy(() => import('./pages/Services'))
const Process = lazy(() => import('./pages/Process'))
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const NotFound = lazy(() => import('./pages/NotFound'))

/**
 * Removes the static [data-default] head tags from index.html once React
 * has mounted its own title/description/canonical/og:* for the current
 * route — React's built-in head hoisting only manages tags it renders
 * itself, so the pre-render fallbacks would otherwise sit alongside the
 * real ones forever, and document.querySelector (what any JS-executing
 * crawler or share-preview bot actually reads) would keep finding the
 * home page's generic copy first. See index.html's comment.
 */
function DefaultMetaCleanup() {
  useEffect(() => {
    document.querySelectorAll('[data-default]').forEach((el) => el.remove())
  }, [])
  return null
}

/** Scroll to top on route change; honor #hash anchors. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <Layout>
      <DefaultMetaCleanup />
      <ScrollManager />
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process" element={<Process />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
