import React, {useEffect, useState} from "react";
import {ButtonBase, Grid} from "@mui/material";
import "./rightsidebar.css"
import Hot_hashtag from "./Hot_hashtag";
import {Link} from "react-router-dom";
import axios from "axios";
import {Get_hot_hashtags} from "../../../api/api_tweeter";
import {toast} from "react-toastify";
import Col from "../../Col";
import {set_Hot_hashtags_list, Use_Tweet_Dispatch, Use_Tweet_State} from "../../../Context/Tweeter_context";
import {useTranslation} from "react-i18next";

const Rightsidebar = ({className}) => {
    // const [hot_hashtags_array, setHot_hashtags_array] = useState([]);

    const {hot_hashtag_list} = Use_Tweet_State();
    const dispatch = Use_Tweet_Dispatch();

    useEffect(() => {
        Get_hot_hashtags((Ok_flag, result)=>{
            if (!Ok_flag){
               return toast.error(result.message);
            }
            // console.log(result);
            set_Hot_hashtags_list(dispatch, result);
        })
    }, []);

    const {t} = useTranslation();

    return(
        <div className={className}>
            <div>
                <Link to={`/`}>
                    <Grid container direction={"row"} alignItems={"center"}>
                        <Grid item >
                            <img className={"img_brand"} src={"/images/logo.PNG"} alt={"logo"}/>
                        </Grid>
                        <Grid item >
                            <h1 className={"title_brand"}>{t("main_logo")}</h1>
                        </Grid>
                    </Grid>
                </Link>
                <h1 className={"hot_hashtags"}>{t("hot_hashtags")}</h1>
                <Grid container direction={"column"}>
                    <Grid item container direction={"column"}>
                        {hot_hashtag_list.map((current, index) =>{
                            if (index<10){
                                return(
                                    <ButtonBase key={index} style={{
                                        margin : ".2rem 0"
                                    }}>
                                        <Grid item container flexDirection={"column"} key={index}>
                                            <Link to={`/Hashtag/${current.text}`}>
                                                <Hot_hashtag key={index}>{current.text}</Hot_hashtag>
                                            </Link>
                                        </Grid>
                                    </ButtonBase>
                                )
                            }
                        })}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Rightsidebar