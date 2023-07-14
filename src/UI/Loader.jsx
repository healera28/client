import React from 'react'
import {Spin} from 'antd'
import { styled } from 'styled-components'

export default function Loader() {
  return (
    <SLoader>
        <Spin />
    </SLoader>
  )
}


const SLoader = styled.div`
    width: 100%;
    text-align:center
`