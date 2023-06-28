import React, {useRef, useState} from "react";
import {ButtonBase, Grid} from "@mui/material";
import "./New_tweet_styles.css"
import {Send_new_tweet} from "../../../api/api_tweeter";
import {toast} from "react-toastify";
import {
    Use_Tweet_State,
    set_Tweet_text as set_tweet_text,
    Use_Tweet_Dispatch,
    update_hot_hashtag_list
} from "../../../Context/Tweeter_context";
import {useTranslation} from "react-i18next";

const New_Tweet = ({update_tweets}) => {

    const input_image = useRef(null);
    const {tweet_text} = Use_Tweet_State();
    const tweet_dispatch = Use_Tweet_Dispatch();

    const {t} = useTranslation();

    const tweet_change_handler = (e) => {
        set_tweet_text(tweet_dispatch, e.target.value);
    };

    const new_tweet_send_handler = (e) => {
        if (!tweet_text){
            return ;
        };


        const data = new FormData();
        data.append("text", tweet_text);
        if (image_file){
            data.append("image", image_file);
        }

        Send_new_tweet((Ok_flag, result)=>{
            if (Ok_flag){
                toast.success(t("suc_send_tweet"));
                update_tweets();
                set_tweet_text(tweet_dispatch ,"");
                setImage_path(null);
                setImage_file(null);
                if (tweet_text.includes("#")){
                    update_hot_hashtag_list(tweet_dispatch);
                }
            }else {
                toast.error(result.response.data.message);
            }
        }, data);
    };

    const get_image = () => {
        if (localStorage.getItem("image") && localStorage.getItem("image") !== "undefined"){
            return localStorage.getItem("image");
        }
        return "/images/user_profile.png";
    }

    const [image_src, setImage_src] = useState(get_image);
    const [image_file, setImage_file] = useState(null);
    const [image_path, setImage_path] = useState(null);

    const change_image_handler = (e) => {
        if(e.target.files && e.target.files.length>0){
            setImage_file(e.target.files[0]);
        }

        const reader = new FileReader();
        reader.onload =(e)=>{
            setImage_path(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    }
    
    
    const upload_image_handler = () => {
        input_image.current.click();
    }

    return(
        <div>
            <Grid container className={"new_tweet"}>
                <Grid container>
                    <Grid item>
                        <img src={image_src} className={"new_tweet_img"} onError={()=>{
                            setImage_src("/images/user_profile.png");
                        }}/>
                    </Grid>
                    <Grid item style={{
                        width : "90%"
                    }}>
                        <textarea className={"new_tweet_input"} placeholder={t("new_Tweet_placeholder")} onChange={(e)=>{
                            tweet_change_handler(e);
                        }}
                        value={tweet_text}
                        />
                        <input ref={input_image} type={"file"} style={{display : "none"}} onChange={change_image_handler}/>
                    </Grid>
                    {
                        image_path &&
                        <div>
                            <div style={{
                                backgroundImage : `url(${image_path})`
                            }} className={"new_tweet_upload_image"}></div>
                        </div>
                    }
                </Grid>
                <Grid container direction={"row-reverse"}>
                    <Grid item >
                        <ButtonBase className={"new_tweet_send_btn"} onClick={(e)=>{
                            new_tweet_send_handler(e);
                        }}>{t("new_tweet_btn")}</ButtonBase>
                    </Grid>
                    <Grid item>
                        <ButtonBase  onClick={upload_image_handler}>
                            <img className={"new_tweet_send_img"} src={"images/image_icon.png"}/>
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default New_Tweet