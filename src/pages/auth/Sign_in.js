import React, {useState, useTransition} from "react";
import {Button, Grid, TextField} from "@mui/material";
import "./sign_in_styles.css"
import {toast} from "react-toastify";
import {Signin_auth} from "../../api/api_auth";
import {useTranslation} from "react-i18next";

const Sign_in = (props) => {
    const [username_signin, setUsername_signin] = useState("");
    const [fullname_signin, setFullname_signin] = useState("");
    const [password_signin, setpassword_sign] = useState("");
    const [conf_password_signin, setConf_password_signin] = useState("");

    const {t} = useTranslation();


    const validate_user = ({name, username, password}) => {
        if (!name){
            return t("err_no_name");
        }
        if (!username){
            return t("err_no_username");
        }
        if (!password){
            return t("err_no_password");
        }
        if ( password !== conf_password_signin){
            return t("err_pass_conf");
        }
    }

    const handle_signin = (e) => {
      const user = {
          name : fullname_signin,
          username : username_signin,
          password : password_signin
      };

      const error = validate_user(user);
      if (error){
          toast.warn(error);
          return ;
      }

      Signin_auth(user, (is_ok, data)=>{
          if (is_ok){
              localStorage.setItem("name", data.name);
              localStorage.setItem("username", data.username);
              localStorage.setItem("image", data.image);
              localStorage.setItem("x-auth-token", data["x-auth-token"]);
              toast.success(t("suc_register"));
              window.location.reload();
              return ;
          }
          return toast.warning(data.response.data.message);
      });
    }


    return(
        <Grid container direction={"column"}>
            <p className={"sign_in_text"}>{t("username")}</p>
            <TextField 
                className={"sign_in_input"} 
                variant={"filled"}
                value={username_signin}
                onChange={(e)=>{
                    setUsername_signin(e.target.value);
                }}
            ></TextField>
            <p className={"sign_in_text"}>{t("fullname")}</p>
            <TextField
                className={"sign_in_input"}
                variant={"filled"}
                value={fullname_signin}
                onChange={(e) => {
                    setFullname_signin(e.target.value);
                }}
            ></TextField>
            <p className={"sign_in_text"}>{t("password")}</p>
            <TextField
                className={"sign_in_input"}
                variant={"filled"}
                value={password_signin}
                onChange={(e) => {
                    setpassword_sign(e.target.value);
                }}
            ></TextField>
            <p className={"sign_in_text"}>{t("conf_password")}</p>
            <TextField
                className={"sign_in_input"}
                variant={"filled"}
                value={conf_password_signin}
                onChange={(e) =>{
                    setConf_password_signin(e.target.value);
                }}
            ></TextField>
            <Button
                variant={"contained"}
                color={"secondary"}
                className={"sign_in_text"}
                onClick={handle_signin}
            >{t("register_btn")}</Button>
        </Grid>
    )
}

export default Sign_in