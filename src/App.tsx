import React, {useState} from 'react';
import Listes from "./pages/Dashboard";
import {BrowserRouter, Navigate, Route, Router, Routes} from "react-router";
import Pages from "./layout/AppWrapper";
import Layout from "./layout/LayoutLogin";
import LayoutWB from "./layout/LayoutForLogin";
import MyList from "./pages/List";
import Research from "./pages/Research";
import Setting from "./pages/Settings";
import Login from "./pages/Login";
import { AuthContext } from './context/AuthContext';
import BookDetails from 'pages/BookDetails';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginUserId, setLoginUserId] = useState(1);
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    console.log('user is connected:', isLoggedIn ? 'yes' : 'no', 'user id:', loginUserId);
    return (
        <Pages>
            <BrowserRouter>
            <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, loginUserId, setLoginUserId}}>
                <Routes>
                    {isLoggedIn ?
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Navigate to="/listes" replace/>}/>
                        <Route path="/login" element={<Navigate to="/listes" replace/>}/>
                        <Route path="/listes" element={<Listes localtitle={"Lists"} key={"list"} />}/>
                        <Route path="/listes/:mylist" element={<MyList userId={loginUserId}/>}/>
                        <Route path="/options" element={<Setting localtitle={'Options'}/>}/>
                        <Route path="/recherches" element={<Research/>}/>
                        <Route path="/livre/:isbn" element={<BookDetails/>}/>
                        <Route path="*" element={<div>404</div>}/>
                    </Route>
                    :
                    <Route element={<LayoutWB/>}>
                        <Route path="/" element={<Navigate to="/login" replace/>}/>
                        <Route path="*" element={<Navigate to="/login" replace/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Route>
                    }
                </Routes>
            </AuthContext.Provider>
            </BrowserRouter>
        </Pages>
    )
        ;
}

export default App;
