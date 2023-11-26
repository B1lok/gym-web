import {COACHES_ROUTE, FAQ_ROUTE, MAIN_ROUTE} from "../../../../../utils/constants";
import {Group, Help, Home} from "@mui/icons-material";

export const PAGES = [
    {title: 'Main', link: MAIN_ROUTE, icon: <Home/>},
    {title: 'Coaches', link: COACHES_ROUTE, icon: <Group/>},
    {title: 'FAQ', link: FAQ_ROUTE, icon: <Help/>},
]