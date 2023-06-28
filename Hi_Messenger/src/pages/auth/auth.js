import React, {useState} from "react";
import {Grid, Paper, Tab, Tabs, useMediaQuery, useTheme} from "@mui/material";
import "./auth_styles.css"
import Log_in from "./Log_in";
import Sign_in from "./Sign_in";
import {useTranslation} from "react-i18next";

const Login_tab_v = 1;
const Signin_tab_v = 2;

const Auth = (props) => {

    const theme = useTheme();
    const is_tablet_mod = useMediaQuery(theme.breakpoints.down("md"));
    let width = "30%";
    if (is_tablet_mod){
        width = "70%";
    }

    const {t} = useTranslation();

    const [Tab_value, setTab_value] = useState(Login_tab_v);

    const tab_change_handler = (event, new_value) => {
        setTab_value(new_value);
    }

    return(
        <Paper className={"auth_paper"} sx={{
            width : width
        }}>
            <Grid container justifyContent={"center"} alignItems={"center"}>
                <p className={"title_brand"}>{t("login_logo")}</p>
                <img src={"/images/logo.PNG"} className={"img_brand"}/>
            </Grid>
            <Tabs value={Tab_value}
                  onChange={tab_change_handler}
                  variant={"fullWidth"}
                  indicatorColor={"secondary"}
                  textColor={"secondary"}
            >
                <Tab label={t("login")} value={Login_tab_v} className={"tab"}/>
                <Tab label={t("register")} value={Signin_tab_v} className={"tab"}/>
            </Tabs>
            {Tab_value === Signin_tab_v &&
                <Sign_in/>
            }
            {Tab_value === Login_tab_v &&
                <Log_in/>
            }
        </Paper>
    )
}

export default Auth

