import { Pagination, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import columns from './columns'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { UserActionCreators } from '../../store/reducers/usersTableReducer'
import UpdateTableBtn from './Actions/UpdateTableBtn'
import AddUserBtn from './Actions/AddUserBtn'
import DownloadBtn from './Actions/DownloadBtn'
import PurePanel from 'antd/es/tooltip/PurePanel'
import Search from './Actions/Search'

export default function UsersTable() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)
    const loading = useSelector(state => state.user.loading)
    const [query, setQuery] = useState("")

    useEffect(() => {
        dispatch(UserActionCreators.getUsers())
    }, [])

    console.log(users)

    const handlePageChange = page => {
        dispatch(UserActionCreators.getUsers({ page, search: query }))
    }

    const updateTable = () => {
        dispatch(UserActionCreators.getUsers())
        setQuery("")
    }


    const handleSubmit = e => {
        e.preventDefault()
        dispatch(UserActionCreators.getUsers({ search: query }))
    }



    return (
        <SUsersTable>
            <h2>Пользователи</h2>
            <TableButtons>
                <UpdateTableBtn updateTable={updateTable} />
                <AddUserBtn />
                <DownloadBtn />
                <Search
                    handleSubmit={handleSubmit}
                    query={query}
                    setQuery={setQuery}
                />
            </TableButtons>
            <STable
                dataSource={users.users}
                columns={columns}
                loading={loading}
                pagination={false}
            />
            <Pagination
                style={{ alignSelf: "flex-end" }}
                current={users.page}
                total={users.usersCount}
                pageSize={3}
                onChange={handlePageChange}
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
