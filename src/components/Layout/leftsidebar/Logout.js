import React from "react";
import {ButtonBase, Grid} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import "./logout_styles.css"
import {useTranslation} from "react-i18next";

const Logout = () => {
    const handle_logout = (e) => {
        localStorage.clear();
        window.location.reload();
    };

    const {t} = useTranslation();

    return(
        <Grid container direction={"row-reverse"}>
            <ButtonBase onClick={handle_logout}>
                <p className={"logout_text"}>{t("logout_btn")}</p>
                <LogoutIcon/>
            </ButtonBase>
        </Grid>
    )
}

export default Logout