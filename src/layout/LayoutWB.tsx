import {FC} from 'react';
import {Outlet} from "react-router";
import MenuBox from "../pages/C_footer/MenuBox";
import NavBarTop from "../pages/A_header/NavBarTop";

const Layout: FC<{}> = ({}) => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default Layout;
