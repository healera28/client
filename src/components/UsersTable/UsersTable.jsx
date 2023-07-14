import { Table } from 'antd'
import React, { useEffect } from 'react'
import columns from './columns'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { UserActionCreators } from '../../store/reducers/usersTableReducer'
import UpdateTableBtn from './Actions/UpdateTableBtn'
import AddUserBtn from './Actions/AddUserBtn'
import DownloadBtn from './Actions/DownloadBtn'

export default function UsersTable() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)
    const loading = useSelector(state => state.user.loading)

    useEffect(() => {
        dispatch(UserActionCreators.getUsers())
    }, [])

  return (
    <SUsersTable>
        <h2>Пользователи</h2>
        <TableButtons>
            <UpdateTableBtn />  
            <AddUserBtn />
            <DownloadBtn />
        </TableButtons>
        <STable
            dataSource={users}
            columns={columns}
            loading={loading}
        />
    </SUsersTable>
  )
}

const TableButtons = styled.div`
    width: 100%;
    display:flex;
    gap: 12px;
`
const SUsersTable = styled.div`
    width: 100%;
    display:flex;
    flex-direction:column;
    gap: 20px;
`
const STable = styled(Table)`
    width: 100%;
`
