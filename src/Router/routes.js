import Login from "../components/Login/Login";
import UsersTable from "../components/UsersTable/UsersTable";


export const publicRoutes = [
    {path: "/login", component: <Login />}
]

export const privateRoutes = [
    {path: "/users", component: <UsersTable />}
]