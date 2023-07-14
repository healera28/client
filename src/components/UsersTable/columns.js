import DeleteUserBtn from "./Actions/DeleteUserBtn"

const columns = [
    {
        title: 'Почта',
        dataIndex: 'email',
        key: 'email',
        render: email => email
    },
    {
        title: 'ID Заказа',
        dataIndex: 'order_id',
        key: 'orderId',
        render: orderId => orderId
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
        render: phone => phone
    },
    {
        title: 'Создано',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: date => date
    },
    {
        title: 'Удалить',
        key: 'delete',
        render: user =>  <DeleteUserBtn user={user} />
    }
]

export default columns