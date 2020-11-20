import React from 'react'
import Layout from '.'
import HeaderLink from '../header/header-link'

const Subnav = () => (
  <ul className="inline-flex items-center">
    <HeaderLink href="/engagement/committees">Committees</HeaderLink>
    <HeaderLink href="/engagement/class-representatives">
      Class Representatives
    </HeaderLink>
    <HeaderLink href="/engagement/volunteer">Volunteer</HeaderLink>
    <HeaderLink href="/engagement/programs">Programs</HeaderLink>
  </ul>
)

const EngagementLayout = ({ children }) => (
  <Layout Subnav={Subnav}>{children}</Layout>
)

export default EngagementLayout
