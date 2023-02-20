import React, {useState} from "react";
import {ButtonBase, Grid} from "@mui/material";
import "../../Tweet_By_hashtag/components/tweet_styles.css"
import {set_Tweet_list, set_Tweet_text, tweet_like, Use_Tweet_Dispatch} from "../../../Context/Tweeter_context";
import {Get_all_tweets, Like_Tweet_Request} from "../../../api/api_tweeter";
import {toast} from "react-toastify";

const Tweet = ({profile_img, name, id, like_num, text, tweet_image, tweet_id}) => {
    const hashtag_text_handle = (text) => {
        return {__html : text.replace(/#\S+/g, (key)=>{
                let url = key.substring(1);
                url = "/Hashtag/" + url;
                return `<a href=${url} style='color: #c979b7'>${key}</a>`;
            })}
    }

    const get_image = () => {
        if (profile_img){
            return profile_img;
        }
        return "/images/user_profile.png";
    }

    const [img_src, setImg_src] = useState(get_image);
    const [image_path, setImage_path] = useState(tweet_image);
    const Tweet_dipatch = Use_Tweet_Dispatch();

    const retweet_handler = (e) => {
        set_Tweet_text(Tweet_dipatch, text);
    }

    const like_handler = () => {
        Like_Tweet_Request(tweet_id, (ok_flag, result)=>{
            if (!ok_flag){
                return toast.error(result.message);
            }
        })
        // console.log(tweet_id);
        tweet_like(Tweet_dipatch, tweet_id);
    }

    return(
        <div>
            <Grid container className={"tweet"}>
                <Grid container alignItems={"center"}>
                    <Grid item>
                        <img src={img_src} className={"new_tweet_img"} alt={"profile image"} onError={()=>{
                            setImg_src("/images/user_profile.png");
                        }}/>
                    </Grid>
                    <Grid item>
                        <h4 className={"tweet_name"}>{name}</h4>
                    </Grid>
                    <Grid item>
                        <h4 className={"tweet_id"}>{id}</h4>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item >
                        <p dangerouslySetInnerHTML={hashtag_text_handle(text)} className={"tweet_text"}></p>
                    </Grid>
                </Grid>
                {
                    image_path &&
                    <div>
                        <div style={{
                            backgroundImage : `url(${image_path})`
                        }} className={"new_tweet_upload_image"} onError={()=>setImage_path(null)}></div>
                    </div>
                }
                <Grid container direction={"row-reverse"} alignItems={"center"}>
                    <Grid item>
                        <ButtonBase onClick={like_handler}>
                            <img className={"tweet_like_img"} src={"/images/red_heart.png"}/>
                        </ButtonBase>
                    </Grid>
                    <Grid item>
                        <span className={"tweet_like_num"}>{like_num}</span>
                    </Grid>
                    <Grid item>
                        <ButtonBase onClick={retweet_handler}>
                            <img className={"tweet_retweet_img"} src={"/images/retweet.png"}/>
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Tweet