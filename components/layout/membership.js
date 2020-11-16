import React from 'react'
import { getLayout as getStandardLayout } from '.'
import HeaderLink from '../header/header-link'

const MembershipLayout = ({ children }) => (
  <>
    <div className="flex items-end justify-end py-2">
      <ul className="inline-flex items-center">
        <HeaderLink href="/membership/enrollment">Enrollment</HeaderLink>
        <HeaderLink href="/membership/faq">FAQ</HeaderLink>
      </ul>
    </div>
    {children}
  </>
)

export const getLayout = (page) =>
  getStandardLayout(<MembershipLayout>{page}</MembershipLayout>)

export default MembershipLayout
