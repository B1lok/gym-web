import {useContext} from 'react';
import {AuthContext} from "../../../../context/authContext";
import HeaderDesktop from "./components/header-desktop/HeaderDesktop";
import HeaderMobile from "./components/header-mobile/HeaderMobile";
import {useMediaQuery, useTheme} from "@mui/material";

const Header = () => {
    const {isAuth} = useContext(AuthContext)
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <>
            {isDesktop ? (
                <HeaderDesktop isAuth={isAuth}/>
            ) : (
                <HeaderMobile isAuth={isAuth}/>
            )}
        </>
    );
};

export default Header;