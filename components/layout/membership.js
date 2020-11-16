import React from 'react'
import Layout from '.'
import HeaderLink from '../header/header-link'

const MembershipLayout = ({ children }) => (
  <Layout>
    <div className="flex items-end justify-end py-2">
      <ul className="inline-flex items-center">
        <HeaderLink href="/membership/enrollment">Enrollment</HeaderLink>
        <HeaderLink href="/membership/faq">FAQ</HeaderLink>
      </ul>
    </div>
    {children}
  </Layout>
)

export default MembershipLayout
