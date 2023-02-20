import React,{useEffect} from "react";
import Tweet from "../../home/components/Tweet";
import {Get_all_tweets_by_user} from "../../../api/api_tweeter";
import {toast} from "react-toastify";
import {set_Tweet_list, Use_Tweet_Dispatch, Use_Tweet_State} from "../../../Context/Tweeter_context";
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Tweet_list_by_user = ({user_id}) => {
    const {tweet_list} = Use_Tweet_State();
    const dispatch = Use_Tweet_Dispatch();

    const location = useLocation();

    const {t} = useTranslation();

    const update_tweets = () => {
        Get_all_tweets_by_user(user_id, (ok_flag, result)=>{
            if (ok_flag){
                // console.log(result);
                set_Tweet_list(dispatch,result);
            }else{
                toast.error(result.message);
            }
        })
    }

    useEffect(() => {
        update_tweets();
    }, [location]);

    return(
        <div>
            {tweet_list.length ===0 &&
                <p>{t("no_tweet_message")}</p>
            }
            {tweet_list.map(({_id, hashTags, image, likes, text, user}, index) => {
                return (
                    <Tweet
                        profile_img={user.image}
                        name={user.name}
                        id={user.username}
                        text={text}
                        tweet_image = {image}
                        like_num={likes}
                        retweet_num={0}
                        tweet_id = {_id}
                        key={index}
                    />
                )
            })}
        </div>
    )
}

export default Tweet_list_by_user