import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { UserActionCreators } from '../../../store/reducers/usersTableReducer'
import {
  ReloadOutlined
} from '@ant-design/icons';
import { styled } from 'styled-components';

export default function UpdateTableBtn({updateTable}) {
    const dispatch = useDispatch()

  return (
    <SButton onClick={updateTable}>
      <ReloadOutlined />
    </SButton>
  )
}

const SButton = styled(Button)`
  width: 40px;
  display:flex;
  justify-content:center;
  align-items:center;
`