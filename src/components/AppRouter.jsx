import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {unauthenticatedRoutes, userRoutes} from "../router/routes";
import {MAIN_ROUTE} from "../utils/constants";
import {AuthContext} from "../context/authContext";

const AppRouter = () => {

    const {isAuth} = useContext(AuthContext)

    return (
        isAuth ?
            <Routes>
                <>
                    {userRoutes.map(route => <Route
                        key={route.path} element={route.element} path={route.path}/>)}
                </>
                <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}/>
            </Routes> :
            <Routes>
                <>
                    {unauthenticatedRoutes.map(route => <Route
                        key={route.path} element={route.element} path={route.path}/>)}
                </>
                <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}/>
            </Routes>

    );
};

export default AppRouter;