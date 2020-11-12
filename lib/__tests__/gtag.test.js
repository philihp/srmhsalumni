import * as gtag from '../gtag'

describe('gtag', () => {
  describe('GA_TRACKING_ID', () => {
    subject(() => gtag.GA_TRACKING_ID)
    it('exists', () => {
      expect.assertions(1)
      expect($subject).not.toBeUndefined()
    })
  })

  describe('pageview', () => {
    subject(() => gtag.pageview)
    it('forwards to gtag', () => {
      expect.assertions(1)
      window.gtag = jest.fn()
      $subject('https://example.com')
      expect(window.gtag).toHaveBeenCalledWith('config', gtag.GA_TRACKING_ID, {
        page_path: 'https://example.com',
      })
    })
  })

  describe('event', () => {
    subject(() => gtag.event)
    it('forwards to gtag', () => {
      expect.assertions(1)
      const action = 'ACTION'
      const category = 'CATEGORY'
      const label = 'LABEL'
      const value = 'VALUE'
      window.gtag = jest.fn()
      $subject({ action, category, label, value })
      expect(window.gtag).toHaveBeenCalledWith('event', action, {
        event_category: category,
        event_label: label,
        value,
      })
    })
  })
})
