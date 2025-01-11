import {FC} from 'react';
import {Outlet} from "react-router";
import MenuBox from "../components/core/MenuBox";
import MySection from "./MySection";

const Layout: FC<{}> = ({}) => {
    return (
        <>
            {/* <NavBarTop/> */}
            <MySection>
                <Outlet/>
            </MySection>
            <MenuBox/>

        </>
    );
};

export default Layout;
