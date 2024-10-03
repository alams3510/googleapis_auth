import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuthApi } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = async (data) => {
    try {
      if (data["code"]) {
        console.log("code", data["code"]);
        const result = await googleAuthApi(data.code);
        console.log("result", result);

        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const obj = { email, name, token, image };
        sessionStorage.setItem("user-info", JSON.stringify(obj));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  return <button onClick={handleGoogleLogin}>Login</button>;
};

export default Login;
