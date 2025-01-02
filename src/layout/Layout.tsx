import {FC} from 'react';
import {Outlet} from "react-router";
import MenuBox from "../pages/C_footer/MenuBox";
import NavBarTop from "../pages/A_header/NavBarTop";
import MySection from "../components/MySection";

const Layout: FC<{}> = ({}) => {
    return (
        <>
            <NavBarTop/>
            <MySection>
                <Outlet/>
            </MySection>
            <MenuBox/>

        </>
    );
};

export default Layout;
