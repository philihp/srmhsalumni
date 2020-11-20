import React from 'react'
import Layout from '.'
import HeaderLink from '../header/header-link'

const Subnav = () => (
  <ul className="inline-flex items-center">
    <HeaderLink href="/about/board">Board</HeaderLink>
    <HeaderLink href="/about/vision">Vision</HeaderLink>
    <HeaderLink href="/about/mission">Mission</HeaderLink>
    <HeaderLink href="/about/awards">Awards</HeaderLink>
    <HeaderLink href="/about/annual-report">Report</HeaderLink>
  </ul>
)

const AboutLayout = ({ children }) => (
  <Layout Subnav={Subnav}>{children}</Layout>
)

export default AboutLayout
