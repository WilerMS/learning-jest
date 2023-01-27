import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen, prettyDOM, fireEvent } from '@testing-library/react'
import Login from './../components/Authentication/Login'

const mockSetLoggedIn = jest.fn()

jest.mock('../context/auth.context', () => {
  return {
    useAuthContext: () => ({
      setLoggedIn: () => {}, 
      setAuthSection: mockSetLoggedIn
    })
  }
})

jest.mock('../context/list.context', () => {
  return {
    useListContext: () => ({ setOriginalList: true, setList: true, list: true })
  }
})

describe('<Login>', () => {

  test('component renders', () => {
    const { container } = render(<Login />)
    expect(container).toBeInTheDocument()
  })

  test('shows header title', () => {
    render(<Login />)
    screen.getByText(/CLIPBOARD/)
  })

  test('clicking on Sign Up', () => {
    render(<Login />)
    const button = screen.getByText(/Sign Up/)
    fireEvent.click(button)
    expect(mockSetLoggedIn).toHaveBeenCalledTimes(1)
    expect(mockSetLoggedIn).toHaveBeenCalledWith('register')
  })

})