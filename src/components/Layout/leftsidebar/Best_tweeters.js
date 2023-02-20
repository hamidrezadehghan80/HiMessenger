import React, {useEffect, useState} from "react";
import "./Best_tweeters_styles.css"
import Tweeter from "./Tweeter";
import {Link} from "react-router-dom";
import {Get_Best_Tweeters} from "../../../api/api_tweeter";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const Best_tweeters = (props) => {

    const [Tweeters, setTweeters] = useState([]);
    const {t} = useTranslation();

    useEffect(() => {
        Get_Best_Tweeters((Ok_flag, result)=>{
            if (!Ok_flag){
                return toast.error(result.message);
            }
            // console.log(result);
            setTweeters(result);
        })
    }, []);

    return(
        <div className={"best_tweeters_parent"}>
            <p className={"best_tweeters_title"}>{t("best_tweeters")}</p>
            <hr className={"best_tweeters_divider"}/>
            {
                Tweeters.map(({_id, name, username, image}, index) => {
                    if (index<5){
                        return(
                            <Link key={index} to={`/Tweeter/${_id}/${username}`}>
                                <Tweeter key={index} name={name} id={username} img={image}/>
                                {
                                    index !== Tweeters.length-1 && <hr className={"best_tweeters_divider"}/>
                                }
                            </Link>
                        )
                    }
                })
            }
        </div>
    )
}

export default Best_tweeters