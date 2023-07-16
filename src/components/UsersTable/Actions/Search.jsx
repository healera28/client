import { SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { styled } from 'styled-components'

export default function Search({query, setQuery, handleSubmit}) {

  return (
    <SForm onSubmit={handleSubmit}>
        <Input style={{'width': "300px"}}  value={query} onChange={e => setQuery(e.target.value)} placeholder='Поиск' />
        <Button onClick={handleSubmit}><SearchOutlined /></Button>
    </SForm>
)
}

const SForm = styled.form`
    display:flex;
`