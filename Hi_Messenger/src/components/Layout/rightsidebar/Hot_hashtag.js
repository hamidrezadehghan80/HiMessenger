import React from "react";
import "./Hot_hashtag_styles.css"
import {Grid} from "@mui/material";

const Hot_hashtag = ({children}) => {
    return(
        <Grid container alignItems={"center"}>
            <img alt={"hashtag"} src={"/images/png-transparent-social-media-number-sign-hashtag-symbol-tags-text-label-logo.png"} className={"hashtag_logo"}/>
                <h3 className={"hot_hashtags_title"}>
                    {children}
                </h3>
        </Grid>
    )
}

export default Hot_hashtag