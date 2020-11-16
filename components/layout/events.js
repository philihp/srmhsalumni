import React from 'react'
import { getLayout as getStandardLayout } from '.'
import HeaderLink from '../header/header-link'

const EventsLayout = ({ children }) => (
  <>
    <div className="flex items-end justify-end py-2">
      <ul className="inline-flex items-center">
        <HeaderLink href="/events/upcoming">Upcoming</HeaderLink>
        <HeaderLink href="/events/annual">Annual</HeaderLink>
      </ul>
    </div>
    {children}
  </>
)

export const getLayout = (page) =>
  getStandardLayout(<EventsLayout>{page}</EventsLayout>)

export default EventsLayout
