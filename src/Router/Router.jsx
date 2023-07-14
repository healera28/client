import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './routes'
import { styled } from 'styled-components'

export default function Router() {
  const isAuth = useSelector(state => state.auth.isAuth)

  return (
    <Content>
      <Routes>
        {
          isAuth ?
            <>
              {privateRoutes.map(route =>
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              )}
              <Route
                path={"*"}
                element={<Navigate to="/users" />}
              />
            </>
            :
            <>
              {
                publicRoutes.map(route =>
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.component}
                  />
                )
              }
              <Route
                path="*"
                element={<Navigate to="/login" />}
              />
            </>
        }
      </Routes>
    </Content>
  )
}

const Content = styled.div`
  width: 100%;
  padding: 30px 50px;
`
