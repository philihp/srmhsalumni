import React from 'react'
import { getLayout as getStandardLayout } from '.'
import HeaderLink from '../header/header-link'

const AboutLayout = ({ children }) => (
  <>
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
  </>
)

export const getLayout = (page) =>
  getStandardLayout(<AboutLayout>{page}</AboutLayout>)

export default AboutLayout
