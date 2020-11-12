import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

const AmpIncludeCustomElement = ({ name, version }) => {
  return (
    <Head>
      <script
        async
        custom-element={name}
        src={`https://cdn.ampproject.org/v0/${name}-${version}.js`}
        key={name}
      />
    </Head>
  )
}

AmpIncludeCustomElement.propTypes = {
  name: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
}

export default AmpIncludeCustomElement
