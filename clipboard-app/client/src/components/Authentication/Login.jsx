import * as S from './styles'
import { FiLock } from 'react-icons/fi'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useAuthContext } from '../../context/auth.context'
import Input from './Input'


const Login = () => {

  const [userData, setUserData] = useState({ username: '', password: '' })
  const { error, loading, fetchData } = useFetch('/login', false)
  const { setLoggedIn, setAuthSection } = useAuthContext()

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const login = async () => {
    const data = await fetchData({
      method: 'POST',
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
      }),
    })

    if (data.token) {
      localStorage.setItem('token', data.token)
      setLoggedIn(true)
    }
  }

  return (
    <S.Container>
      <div className="login">
        <S.SignIn>CLIPBOARD</S.SignIn>
        <Input
          name='username'
          placeholder='username'
          onChange={handleChange}
        />
        <Input
          name='password'
          placeholder='******'
          type='password'
          onChange={handleChange}
          Icon={FiLock}
        />
        <div className="error">
          {error ? error.message : ''}
        </div>
        <S.Button onClick={login} disabled={loading}>
          Log in
        </S.Button>
        <div className='signup'>
          Don't have an account?
          <span onClick={() => setAuthSection('register')}> Sign Up</span>
        </div>
      </div>
    </S.Container>
  )
}

export default Login