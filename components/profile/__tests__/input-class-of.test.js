import { graduatingYears } from '../input-class-of'

describe('InputClassOf', () => {
  describe('graduatingYears', () => {
    const CURRENT_YEAR = new Date().getFullYear()
    subject(() => graduatingYears())
    it('creates appropriate length', () => {
      expect.assertions(1)
      expect($subject).toHaveLength(CURRENT_YEAR - 2000)
    })
    it('first year is 2001', () => {
      expect.assertions(1)
      expect($subject[0]).toBe(2001)
    })
    it('last year is current year', () => {
      expect.assertions(1)
      expect($subject[$subject.length - 1]).toBe(CURRENT_YEAR)
    })
  })
})
