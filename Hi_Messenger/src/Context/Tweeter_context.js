import {createContext, useContext, useReducer} from "react";
import {Get_hot_hashtags} from "../api/api_tweeter";

var Tweet_state_context = createContext();
var Tweet_dispatch_context = createContext();

function Tweet_reducer(state, action) {
    switch (action.type) {
        case "SET_Tweet" : {
            return {...state, tweet_text : action.payload};
        }
        case "LIKE_Tweet" :{
            const tweet_id = action.payload;
            const founded_index = state.tweet_list.findIndex((item)=>item._id === tweet_id);
            // console.log(founded_index);
            // console.log(state.tweet_list);
            if (founded_index === -1) {
                return state;
            }
            return {...state, tweet_list : [
                    ...state.tweet_list.slice(0,founded_index),
                    {
                        ...state.tweet_list[founded_index],
                        likes : state.tweet_list[founded_index].likes +1
                    },
                    ...state.tweet_list.slice(founded_index+1)
                ]};
        }
        case "SET_Tweet_List": {
            return {...state, tweet_list: action.payload};
        }
        case "SET_Hot_hashtag_list": {
            return {...state, hot_hashtag_list: action.payload};
        }
        default:{
            throw new Error("unhandled action type");
        }

    }
}

function Tweet_provider({children}) {
    const [state, dispatch] = useReducer(Tweet_reducer, {
        tweet_text : "",
        tweet_list : [],
        hot_hashtag_list : []
    });

    return(
        <Tweet_state_context.Provider value={state}>
            <Tweet_dispatch_context.Provider value={dispatch}>
                {children}
            </Tweet_dispatch_context.Provider>
        </Tweet_state_context.Provider>
    );
}

function Use_Tweet_State() {
    let tweet_state = useContext(Tweet_state_context);
    if (tweet_state === undefined){
        throw new Error("useTweetState must be use within a TweetProvider");
    }
    return tweet_state;
}

function Use_Tweet_Dispatch() {
    let tweet_dispatch = useContext(Tweet_dispatch_context);
    if (tweet_dispatch === undefined){
        throw new Error("useTweetDispatch must be use within a TweetProvider");
    }
    return tweet_dispatch;
}

function set_Tweet_text(dispatch, tweet_text) {
    dispatch({
        type : "SET_Tweet",
        payload : tweet_text
    });
};

function tweet_like(dispatch, tweet_id) {
    dispatch({
        type : "LIKE_Tweet",
        payload : tweet_id
    });
};

function set_Tweet_list(dispatch, tweet_list) {
    dispatch({
        type : "SET_Tweet_List",
        payload : tweet_list
    });
};

function set_Hot_hashtags_list(dispatch, hot_hashtag_list) {
    dispatch({
        type : "SET_Hot_hashtag_list",
        payload : hot_hashtag_list
    });
};

function update_hot_hashtag_list(dispatch) {
    Get_hot_hashtags((is_ok, result)=>{
        if (is_ok){
            dispatch({
                type : "SET_Hot_hashtag_list",
                payload : result
            });
        }
    });
}

export {
    Tweet_provider,
    Use_Tweet_State,
    Use_Tweet_Dispatch,
    set_Tweet_text,
    set_Tweet_list,
    tweet_like,
    set_Hot_hashtags_list,
    update_hot_hashtag_list}
    ;