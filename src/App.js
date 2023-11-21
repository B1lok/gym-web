import {AuthContext} from "./context/authContext";
import {BrowserRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import AppRouter from "./components/AppRouter";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [token, setToken] = useState('')
    const [roles, setRoles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
            setToken(localStorage.getItem('token'))
            setRoles(JSON.parse(localStorage.getItem('roles')))
        }
        setIsLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth, setIsAuth,
            token, setToken,
            roles, setRoles, isLoading
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;