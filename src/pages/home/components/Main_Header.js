import React from "react";
import {ButtonBase, Grid, IconButton, useMediaQuery, useTheme} from "@mui/material";
import "./header_styles.css"
import {useTranslation} from "react-i18next";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {toggle_drawer, Use_Layout_Dispatch, Use_Layout_State} from "../../../Context/Layout_context";

const Main_Header = (props) => {

    const {t} = useTranslation();
    const theme = useTheme();
    const is_tablet_mod = useMediaQuery(theme.breakpoints.down("md"));
    const dispatch = Use_Layout_Dispatch();

    return(
        <Grid container className={"header"}>
            {is_tablet_mod &&(
                <Grid item>
                    <IconButton onClick={()=>{
                        toggle_drawer(dispatch);
                    }}>
                        <MenuOpenIcon sx={{
                            color : "black",
                        }}/>
                    </IconButton>
                </Grid>
            )
            }
            <Grid item>
                <ButtonBase>
                    <img src={"/images/home_icon.png"} className={"home_icon"}/>
                    <p className={"home_text"}>{t("home_btn")}</p>
                </ButtonBase>
            </Grid>
        </Grid>
    )
}

export default Main_Header