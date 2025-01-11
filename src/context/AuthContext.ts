import {createContext, FC, ReactNode, useState} from 'react';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn:any;
    loginUserId: number;
    setLoginUserId: any;
}
