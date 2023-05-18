import { inject } from './dependencies-injection'

/**
 * @jest-environment jsdom
 */
describe('Injector', () => {
  it('Must returns instanced object', () => {
    expect(inject(Window)).toBe(window)
  })
})
