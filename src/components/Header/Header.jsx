import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AuthActinonCreators } from '../../store/reducers/authReducer'

export default function Header() {
  const isAuth = useSelector(state => state.auth.isAuth)
  const dispatch = useDispatch()
  
  const handleLogOut = () => {
    dispatch(AuthActinonCreators.logout())
  }

  return (
    <SHeader>
      {
        isAuth ?
          <>
            <h1>Администрация</h1>
            <Button onClick={handleLogOut}>выйти</Button>
          </>
          :
          <h1>Healera</h1>
      }
    </SHeader>
  )
}

const SHeader = styled.div`
  width: 100%;
  height: 80px;
  box-shadow: 0 0 30px #e3e3e3;
  display:flex;
  align-items: center;
  padding: 0 50px;
  justify-content:space-between;
`