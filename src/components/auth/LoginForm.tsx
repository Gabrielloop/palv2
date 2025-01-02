import {Box, Button, TextField } from '@mui/material';
import React, {FC, useContext} from 'react';
import {useForm, SubmitHandler} from "react-hook-form"
import { useNavigate } from 'react-router';
import {AuthContext} from "../../context/AuthContext";

interface LoginFormInput {
    email: string
    password: string
}

const LoginForm: FC<{}> = ({}) => {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
        console.log(data)
        console.log(errors);
        authContext?.setIsLoggedIn(true)
        navigate('/liste');
    }
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
            <Box
                className={"login-form"}
                component="form"
                sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
            <TextField
                        className={"login-input"}
                        required
                        id="outlined-required"
                        label="Adresse mail"
                        defaultValue=""
                        {...register("email")}
                    />
                    <TextField
                        className={"login-input"}
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        {...register("password")}
                    />
                <Button variant="contained" type="submit">Se connecter</Button>
                {errors.email && <span>This field is required</span>}

            </Box>
    )
}


export default LoginForm;
