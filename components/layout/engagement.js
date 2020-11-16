import React from 'react'
import Layout from '.'
import HeaderLink from '../header/header-link'

const EngagementLayout = ({ children }) => (
  <Layout>
    <div className="flex items-end justify-end py-2">
      <ul className="inline-flex items-center">
        <HeaderLink href="/engagement/committees">Committees</HeaderLink>
        <HeaderLink href="/engagement/class-representatives">
          Class Representatives
        </HeaderLink>
        <HeaderLink href="/engagement/volunteer">Volunteer</HeaderLink>
        <HeaderLink href="/engagement/programs">Programs</HeaderLink>
      </ul>
    </div>
    {children}
  </Layout>
)

export default EngagementLayout
