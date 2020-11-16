import React from 'react'
import Layout from '.'
import HeaderLink from '../header/header-link'

const AboutLayout = ({ children }) => (
  <Layout>
    <div className="flex items-end justify-end py-2">
      <ul className="inline-flex items-center">
        <HeaderLink href="/about/board">Board</HeaderLink>
        <HeaderLink href="/about/vision">Vision</HeaderLink>
        <HeaderLink href="/about/mission">Mission</HeaderLink>
        <HeaderLink href="/about/awards">Awards</HeaderLink>
        <HeaderLink href="/about/annual-report">Report</HeaderLink>
      </ul>
    </div>
    {children}
  </Layout>
)

export default AboutLayout
