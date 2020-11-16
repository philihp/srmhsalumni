import React from 'react'
import Layout from '.'
import HeaderLink from '../header/header-link'

const EventsLayout = ({ children }) => (
  <Layout>
    <div className="flex items-end justify-end py-2">
      <ul className="inline-flex items-center">
        <HeaderLink href="/events/upcoming">Upcoming</HeaderLink>
        <HeaderLink href="/events/annual">Annual</HeaderLink>
      </ul>
    </div>
    {children}
  </Layout>
)

export default EventsLayout
