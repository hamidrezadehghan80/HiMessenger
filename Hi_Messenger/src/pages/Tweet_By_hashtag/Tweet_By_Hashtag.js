import "./Tweet_by_hashtag_styles.css"
import React from "react";
import Tweet_list_by_hashtag from "./components/Tweet_list_by_hashtag";
import Header from "./components/Header";
import {useParams} from "react-router-dom";
import Main_Header from "../home/components/Main_Header";

export default function Tweet_By_Hashtag (props) {
    const params = useParams();
    let tag = params.Tag;
    return(
        <div className={"mainbar"}>
            <Main_Header/>
            <Header hashtag={tag}/>
            <Tweet_list_by_hashtag hashtag={tag}/>
        </div>
    )
}