import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { UserActionCreators } from '../../../store/reducers/usersTableReducer'
import { styled } from 'styled-components'

export default function DeleteUserBtn({user}) {
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleUserDelete = () => {
        dispatch(UserActionCreators.deleteUser(user.id))
        handleCancel()
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Удалить
            </Button>
            <SModal
                width="400px"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
            >
                <Wrapper>
                    <h2>Вы уверены что хотите удалить {user.email}</h2>
                    <Buttons>
                        <Button style={{width: "100%"}} onClick={handleCancel}>Нет</Button>
                        <Button style={{width: "100%"}} onClick={handleUserDelete}>Да</Button>
                    </Buttons>
                </Wrapper>
            </SModal>
        </>
    )
}

const Buttons = styled.div`
    width: 100%;
    display:flex;
    gap: 20px;
`
const Wrapper = styled.div`
width: 100%;
    display:flex;
    flex-direction:column;
    gap: 20px;
`
const SModal = styled(Modal)`
    text-align:center;
`

