import React from "react";
import {Grid} from "@mui/material";
import "./profile_styles.css";

const Profile = ({name, id, img}) => {

    return(
        <Grid container direction={"row-reverse"}>
            <Grid item>
                <img alt={"profile_image"} src={img} className={"profile_img"}/>
            </Grid>
            <Grid container item direction={"column"} className={"profile_text"}>
                <p className={"profile_name"}>{name}</p>
                <p className={"profile_id"}>{id}</p>
            </Grid>
        </Grid>
    )
}

export default Profile