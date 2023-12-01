import {MAIN_ROUTE} from "./constants";

export const signOut = (navigate, setIsAuth, setToken, setRoles) => {
    setIsAuth(false)
    setToken('')
    setRoles([])
    localStorage.removeItem('auth')
    localStorage.removeItem('roles')
    localStorage.removeItem('token')
    navigate(MAIN_ROUTE)
}