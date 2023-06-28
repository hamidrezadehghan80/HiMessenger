import "./Tweet_By_tweeter_styles.css"
import React from "react";
import Header from "./components/Header";
import {useParams} from "react-router-dom";
import Tweet_list_by_user from "./components/Tweet_list_by_user";
import Main_Header from "../home/components/Main_Header";

const Tweet_By_Tweeter = () => {
    const params = useParams();
    const id = params.Id;
    const username = params.Username;
    return(
        <div className={"tweet_by_tweeter"}>
            <Main_Header/>
            <Header tweeter={username}/>
            <Tweet_list_by_user user_id={id}/>
        </div>
    )
}

export default Tweet_By_Tweeter