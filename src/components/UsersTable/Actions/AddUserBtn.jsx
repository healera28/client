import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { UserActionCreators } from '../../../store/reducers/usersTableReducer'
import { Button, Input, Modal, message } from 'antd'
import { styled } from 'styled-components'

export default function AddUserBtn() {
    const dispatch = useDispatch()  
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fields, setFields] = useState({})
    const req_error = useSelector(state => state.user.error)
    const [error, setError] = useState("")
    const [messageApi, contextHolder] = message.useMessage()

    const handleAddUser = () => {
        if(
            fields.email?.trim() && 
            fields.email?.includes("@")
        ) {
            dispatch(UserActionCreators.addUser({
                email: fields.email,
                order_id: fields.order_id,
                customer_phone: fields.customer_phone
            }))

            handleCancel()
        }else { 
            setError("Неверная почта")
        }
    }

    useEffect(() => {
        if(req_error.message) {
            messageApi.open({
                type: "error",
                content: req_error.message
            })
        }
    }, [req_error.message])

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setError('')
        setFields({})
    }

    return (
        <>
            {contextHolder}
            <IconBtn onClick={showModal}><PlusOutlined /></IconBtn>
            <Modal onCancel={handleCancel} width="400px" open={isModalOpen} footer={false}>
                <Form onSubmit={handleAddUser}>
                    <h2>Новый пользователь</h2>
                    <Input
                        type="email"
                        placeholder="Почта"
                        value={fields.email}
                        onChange={e => setFields({ ...fields, email: e.target.value })}
                    />
                    <Input
                        placeholder="ID Заказа"
                        value={fields.order_id}
                        onChange={e => setFields({ ...fields, order_id: e.target.value })}
                    />
                    <Input
                        placeholder="Телефон"
                        value={fields.customer_phone}
                        onChange={e => setFields({ ...fields, customer_phone: e.target.value })}
                    />
                </Form>
                <p style={{marginBottom: "20px", textAlign: "center", color: 'red'}}>{error}</p>
                <Footer>
                    <SButton onClick={handleCancel}>Отмена</SButton>
                    <SButton onClick={handleAddUser}>Создать</SButton>
                </Footer>
            </Modal>
        </>

    )
}

const SButton = styled(Button)`
    width: 100%;
`
const Footer = styled.div`
    width: 100%;
    display:flex;
    gap: 12px;
`
const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction:column;
    gap: 20px;
    margin-bottom: 12px;
    text-align:center
`
const IconBtn = styled(Button)`
  width: 40px;
  display:flex;
  justify-content:center;
  align-items:center;
`