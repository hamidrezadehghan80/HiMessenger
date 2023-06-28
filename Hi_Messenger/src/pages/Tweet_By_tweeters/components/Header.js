import React from "react";
import "./Header_styles.css";
import PersonIcon from '@mui/icons-material/Person';
import {Grid} from "@mui/material";

export default function Header ({tweeter}) {
    return(
        <Grid container alignItems={"center"} className={"tweet_by_tweeter_header"}>
            <PersonIcon sx={{
                fontSize : "xx-large",
                color : "black"
            }}/>
            <span>{tweeter}</span>
        </Grid>
    )
}