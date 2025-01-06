import React, {useState} from 'react';
import './App.css';
import Listes from "./pages/B_body/Listes";
import {BrowserRouter, Navigate, Route, Router, Routes} from "react-router";
import Pages from "./components/Pages";
import Layout from "./layout/Layout";
import LayoutWB from "./layout/LayoutWB";
import MyList from "./pages/B_body/MyList";
import Research from "./pages/B_body/Research";
import Setting from "./pages/B_body/Setting";
import Login from "./pages/B_body/Login";
import { AuthContext } from './context/AuthContext';
import BookDetails from 'pages/B_body/BookDetails';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    console.log(isLoggedIn);
    return (
        <Pages>
            <BrowserRouter>
            <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
                <Routes>
                    {isLoggedIn ?
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Navigate to="/listes" replace/>}/>
                        <Route path="/login" element={<Navigate to="/listes" replace/>}/>
                        <Route path="/listes" element={<Listes localtitle={"Listes"} key={"liste"}/>}/>
                        <Route path="/listes/:mylist" element={<MyList/>}/>
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
