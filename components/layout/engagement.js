import React from 'react'
import { getLayout as getStandardLayout } from '.'
import HeaderLink from '../header/header-link'

const EngagementLayout = ({ children }) => (
  <>
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
  </>
)

export const getLayout = (page) =>
  getStandardLayout(<EngagementLayout>{page}</EngagementLayout>)

export default EngagementLayout
