import React from 'react'
import Layout from '.'
import HeaderLink from '../header/header-link'

const Subnav = () => (
  <ul className="inline-flex items-center">
    <HeaderLink href="/membership/enrollment">Enrollment</HeaderLink>
    <HeaderLink href="/membership/faq">FAQ</HeaderLink>
  </ul>
)
const MembershipLayout = ({ children }) => (
  <Layout Subnav={Subnav}>{children}</Layout>
)

export default MembershipLayout
