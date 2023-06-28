import React, {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import "./log_in_styles.css";
import {Login_auth} from "../../api/api_auth";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";


const Log_in = (props) => {

    const [Username_login, setUsername_login] = useState("");
    const [Password_login, setPassword_login] = useState("");

    const {t} = useTranslation();

    const validate_login = ({username, password}) => {
        if (!username){
            return t("err_no_username");
        }
        if (!password){
            return t("err_no_password");
        }
    };

    const handle_click = (e) => {
        const user = {
            username : Username_login,
            password : Password_login
        };
        const error = validate_login(user);
        if (error) {
            return toast.warn(error);
        };
        Login_auth(user, (is_ok, data)=>{
            if (is_ok){
                localStorage.setItem("name", data.name);
                localStorage.setItem("username", data.username);
                localStorage.setItem("image", data.image);
                localStorage.setItem("x-auth-token", data["x-auth-token"]);
                toast.success(t("suc_login"));
                window.location.reload();
                return ;
            }
            return toast.warning(data.response.data.message);
        });
    };

    return(
        <Grid container direction={"column"}>
            <p className={"log_in_text"}>{t("username")}</p>
            <TextField className={"log_in_input"}
                       variant={"filled"}
                       value={Username_login}
                       onChange={e=>setUsername_login(e.target.value)}
            ></TextField>
            <p className={"log_in_text"}>{t("password")}</p>
            <TextField className={"log_in_input"}
                       variant={"filled"}
                       value={Password_login}
                       onChange={e=>setPassword_login(e.target.value)}
            ></TextField>
            <Button variant={"contained"}
                    color={"secondary"}
                    className={"log_in_text"}
                    onClick={handle_click}
            >{t("login_btn")}</Button>
        </Grid>
    )
}

export default Log_in