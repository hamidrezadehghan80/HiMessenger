import React from "react";
import Hot_hashtag from "../../../components/Layout/rightsidebar/Hot_hashtag";
import "./Header_styles.css"

const Header = ({hashtag}) => {
    return(
        <div className={"tweet_by_hashtag_header"}>
            <Hot_hashtag>
                {hashtag}
            </Hot_hashtag>
        </div>
    )
}

export default Header