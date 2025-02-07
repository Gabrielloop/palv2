import React, { FC, useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import LoginAnimation from "layout/LoginAnimation";

// Composant de la page de connexion

// TODO : animation de la page de connexion
// TODO : sur un fond noir, des livres sont éparpillés l'utilisateur peut se déplacer pour observer les livres ou se connecter.

const Login: FC<{}> = ({}) => {
  return (
    // <LoginAnimation>
    <LoginForm />
    // </LoginAnimation>
  );
};

export default Login;
