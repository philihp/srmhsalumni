import React from 'react'
import PropTypes from 'prop-types'
import AmpIncludeCustomElement from './amp-include-custom-element'

const AmpAnalytics = ({ type, script }) => {
  return (
    <>
      <AmpIncludeCustomElement name="amp-analytics" version="0.1" />
      <amp-analytics type={type}>
        {script && (
          <script
            type="application/json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(script),
            }}
          />
        )}
      </amp-analytics>
    </>
  )
}

AmpAnalytics.propTypes = {
  type: PropTypes.string.isRequired,
  script: PropTypes.any.isRequired,
}

export default AmpAnalytics
