import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { validateCredentieal } from "../Controller/setupController";
const Auth = () => {
  const navigate = useNavigate();
  console.log("calling auth...........");
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/");
    } else {
      console.log("Auth");
      const searchParams = new URLSearchParams(window.location.search);
      console.log(searchParams);
      const email = searchParams.get("email");
      const token = searchParams.get("token");
      console.log(token);
      if (
        token !== "" &&
        email !== "" &&
        token !== undefined &&
        email !== undefined
      ) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("email", email);
      }
      navigate("/");
    }
  }, []);
  return <div>Authenticating....Please Wait....</div>;
};
export default Auth;