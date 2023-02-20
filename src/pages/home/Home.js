import React from "react";
import "./home_styles.css"
import Main_Header from "./components/Main_Header";
import New_Tweet from "./components/New_Tweet";
import Tweet from "./components/Tweet";
import {useEffect} from "react";
import {Get_all_tweets} from "../../api/api_tweeter";
import {toast} from "react-toastify";
import {set_Tweet_list, Use_Tweet_Dispatch, Use_Tweet_State} from "../../Context/Tweeter_context";

const Home = (props) => {

    const {tweet_list} = Use_Tweet_State();
    const dispatch = Use_Tweet_Dispatch();
    // const [tweet_list, set_tweet_list] = useState([]);

    const update_tweets = () => {
        Get_all_tweets((ok_flag, result)=>{
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
    }, []);

    return(
        <div className={"mainbar"}>
            <Main_Header/>
            <New_Tweet update_tweets={update_tweets}/>
            <div>
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
        </div>
    )
}

export default Home