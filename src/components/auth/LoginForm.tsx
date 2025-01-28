import { Box, Button, TextField } from "@mui/material";
import React, { FC, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { LoginFormInput } from "../../@types/form";
import Message from "components/general/Message";

const LoginForm: FC<{}> = ({}) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    console.log(data);
    console.log(errors);
    authContext?.setIsLoggedIn(true);
    navigate("/liste");
  };
  return (
    <>
      <div
        style={{
          width: "100%",
        }}
      >
        <h1>Mon Application</h1>
        <h2>Se connecter</h2>
      </div>
      <div>
        <Box
          className={"login-form"}
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
            <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding : "5px",
            }}>
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
          <Button variant="contained" type="submit">
            Se connecter
          </Button>
          </div>
          {errors.email && <Message text="Email obigatoire" type="warning" />}
        </Box>
        
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
      s'inscrire <a href="/inscription">ici</a> | Mot de passe oublié ?
      </div>
    </>
  );
};

export default LoginForm;
