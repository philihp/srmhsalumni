import React from 'react'
import Layout from '.'
import HeaderLink from '../header/header-link'

const Subnav = () => (
  <ul className="inline-flex items-center">
    <HeaderLink href="/events/upcoming">Upcoming</HeaderLink>
    <HeaderLink href="/events/annual">Annual</HeaderLink>
  </ul>
)

const EventsLayout = ({ children }) => (
  <Layout Subnav={Subnav}>{children}</Layout>
)

export default EventsLayout
