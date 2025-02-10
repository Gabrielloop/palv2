import { Box, Button, TextField } from "@mui/material";
import React, { FC, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LoginFormInput } from "../../@types/form";
import Message from "components/general/Message";
import { postApiBack } from "../../api/apiback";

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    defaultValues: {
      userMail: "",
      userPassword: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    console.log(data);
    console.log(errors);

    try {
      postApiBack("/auth/login", data);
      // authContext?.setIsLoggedIn(true);

      // navigate("/liste");

      // gestion du token
    } catch (error) {
      console.log(error);
    }
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
              padding: "5px",
            }}
          >
            <TextField
              className={"login-input"}
              required
              id="outlined-required"
              label="Adresse mail"
              defaultValue=""
              {...register("userMail", {
                required: "L'email est obligatoire",
                pattern: { value: /^\S+@\S+$/i, message: "Email invalide" },
              })}
              error={!!errors.userMail}
              helperText={errors.userMail ? errors.userMail.message : ""}
            />
            <TextField
              className={"login-input"}
              required
              id="filled-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
              {...register("userPassword", {
                required: "Le mot de passe est obligatoire",
                minLength: { value: 6, message: "6 caractères minimum" },
              })}
              error={!!errors.userPassword}
              helperText={
                errors.userPassword ? errors.userPassword.message : ""
              }
            />
            <Button variant="contained" type="submit">
              Se connecter
            </Button>
          </div>
          {serverError && <Message text={serverError} type="error" />}
        </Box>
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        s'inscrire <a href="/inscription">ici</a> | Mot de passe oublié ?
      </div>
    </>
  );
};

export default LoginForm;
