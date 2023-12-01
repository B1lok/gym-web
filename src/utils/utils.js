import {MAIN_ROUTE} from "./constants";
import {jwtDecode} from "jwt-decode";

export const signIn = (navigate, setIsAuth, setToken, setRoles, token) => {
    const decodedJwt = jwtDecode(token)

    setIsAuth(true)
    setToken(token)
    setRoles(decodedJwt.roles)

    localStorage.setItem('auth', 'true')
    localStorage.setItem('token', token)
    localStorage.setItem('roles', JSON.stringify(decodedJwt.roles))

    navigate(MAIN_ROUTE)
}

export const signOut = (navigate, setIsAuth, setToken, setRoles) => {
    setIsAuth(false)
    setToken('')
    setRoles([])

    localStorage.removeItem('auth')
    localStorage.removeItem('roles')
    localStorage.removeItem('token')

    navigate(MAIN_ROUTE)
}
