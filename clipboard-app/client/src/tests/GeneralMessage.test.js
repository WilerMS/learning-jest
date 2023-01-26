import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import GeneralMessage from '../components/GeneralMessage'

describe('<Login>', () => {

  const text = 'Test message'
  const type = 'error'
  
  test('should render', () => {
    const { container } = render(<GeneralMessage text={text} type={type} />)
    expect(container).toBeInTheDocument()
  })

  test(`should contain '${text}'`, () => {
    render(<GeneralMessage text={text} type={type} />)
    screen.getByText(text)
  })

  test(`should match with this regexp /Test/`, () => {
    render(<GeneralMessage text={text} type={type} />)
    screen.getByText(/Test/)
  })

  test('should have an h2 heading', () => {
    render(<GeneralMessage text={text} type={type} />)
    const h2 = screen.getByRole('heading')
    expect(h2.tagName).toBe('H2')
  })

})