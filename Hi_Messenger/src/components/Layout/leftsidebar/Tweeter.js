import React, {useState} from "react";
import {ButtonBase, Grid} from "@mui/material";
import "./tweeter_styles.css"


const Tweeter = ({name, id, img}) => {

    const get_image = () => {
        if (img){
            return img;
        }
        return "/images/user_profile.png";
    }

    const [img_src, setImg_src] = useState(get_image);

    return(
        <ButtonBase className={"tweeter"}>
            <Grid container direction={"row"}>
                <Grid item>
                    <img alt={"profile_image"} src={img_src} className={"profile_img"} onError={()=>{
                        setImg_src("/images/user_profile.png");
                    }}/>
                </Grid>
                <Grid container item direction={"column"} className={"profile_text"} alignItems={"start"}>
                    <p className={"profile_name"}>{name}</p>
                    <p className={"profile_id"}>{id}</p>
                </Grid>
            </Grid>
        </ButtonBase>
    )
}

export default Tweeter