import { Button, Input, Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'
import styled  from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { AuthActinonCreators } from '../../store/reducers/authReducer'
import Loader from '../../UI/Loader'

export default function Login() {
    const dispatch = useDispatch()
    const stage = useSelector(state => state.auth.stage)
    const sent = useSelector(state => state.auth.sent)
    const loading = useSelector(state => state.auth.loading)
    const error = useSelector(state => state.auth.error)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, setCode] = useState("")
    const [open, setOpen] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()

    const showModal = () => {
        setOpen(true)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const handleConfirmCode = () => {
        dispatch(AuthActinonCreators.confirmCode(code))
    }

    const handleSignIn = () => {
        if (email && password) {
            dispatch(AuthActinonCreators.signIn({ email, password }))
        }
    }

    const resetPassword = () => {
        if(email && email.includes("@")) {
            dispatch(AuthActinonCreators.resetPassword(email))
            handleCancel()
            setEmail("")
        }
    }

    useEffect(() => {
        if(sent.message) {
            messageApi.open({
                type: "success",
                content: sent.message
            })
        }
    }, [sent.type])

    useEffect(() => {
        if(error.message) {
            messageApi.open({
                type: "error",
                content: error.message
            })
        }
    }, [error.message])


    return (
        <SLogin>
            {contextHolder}
            {
                stage === 1 ?
                    <Form onSubmit={handleSignIn}>
                        <h2 style={{ textAlign: "center" }}>Авторизация</h2>
                        <Input value={email} type='email' placeholder='Логин' onChange={e => setEmail(e.target.value)} />
                        <Input value={password} type='password' placeholder='Пароль' onChange={e => setPassword(e.target.value)} />
                        {error.message && <p style={{ color: "red", textAlign: "center" }}>{error.message}</p>}
                        {loading && <Loader />}
                        <Button onClick={handleSignIn}>Войти</Button>
                        <Button onClick={showModal}>Забыл пароль</Button>
                        <Modal width="400px" open={open} cancelText="Назад" okText="Отправить" onOk={resetPassword} onCancel={handleCancel}>
                            <h2 style={{textAlign: "center", marginBottom: "20px"}}>Сброс пароля</h2>
                            <Input value={email} type='email' placeholder='Почта' onChange={e => setEmail(e.target.value)} />
                        </Modal>
                    </Form>

                    :

                    <Form onSubmit={handleConfirmCode}>
                        <h2 style={{ textAlign: "center" }} >Код потверждения</h2>
                        <Input value={code} type='email' placeholder='Код' onChange={e => setCode(e.target.value)} />
                        {error.message && <p style={{ color: "red", textAlign: "center" }}>{error.message}</p>}
                        {loading && <Loader />}
                        <Button onClick={handleConfirmCode}>Войти</Button>
                    </Form>
            }
        </SLogin>
    )
}


const SLogin = styled.div`
    width: 100%;
    display:flex;
    justify-content:center;
`
const Form = styled.form`
    width: 300px;
    padding: 20px;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    justify-content:center;

    gap: 20px;

`
