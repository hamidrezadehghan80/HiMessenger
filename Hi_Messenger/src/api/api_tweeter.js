import {GetAxiosInstance_jsonserver, GetAxiosInstance_real_private} from "./api";

export const Get_all_tweets = (Callback) => {
  GetAxiosInstance_real_private.post("/getAllTweet")
    .then(resp => {
      const data = resp.data;
      Callback(true, data);
    })
    .catch(err => {
      Callback(false, err);
    })
};

export const Get_all_tweets_by_hashtag = (hashTag, Callback) => {
    GetAxiosInstance_real_private.post("/getAllTweet", {hashTag})
        .then(resp => {
            const data = resp.data;
            Callback(true, data);
        })
        .catch(err => {
            Callback(false, err);
        })
};

export const Get_all_tweets_by_user = (user, Callback) => {
    GetAxiosInstance_real_private.post("/getAllTweet", {user})
        .then(resp => {
            const data = resp.data;
            Callback(true, data);
        })
        .catch(err => {
            Callback(false, err);
        })
};

export const Get_hot_hashtags = (Callback) => {
  GetAxiosInstance_real_private.get("/getAllHashTags")
    .then(resp => {
      const data = resp.data;
      Callback(true, data);
    })
    .catch(err => {
      Callback(false, err);
    })
};

export const Get_Best_Tweeters = (Callback) => {
  GetAxiosInstance_real_private.get("/getAllUser")
    .then(resp => {
      const data = resp.data;
      Callback(true, data);
    })
    .catch(err => {
      Callback(false, err);
    })
}

export const Get_Profile = (Callback) => {
    GetAxiosInstance_real_private.get("/getProfile")
        .then(resp => {
            const data = resp.data;
            Callback(true, data);
        })
        .catch(err => {
            Callback(false, err);
        })
}

export const Send_new_tweet = (Callback, data) => {
  GetAxiosInstance_real_private.post("/newTweet", data)
    .then((resp)=>{
      Callback(true, resp);
    }).catch((err) => {
      Callback(false, err);
  })
};

export const Like_Tweet_Request = (tweet_id, Callback) => {
    GetAxiosInstance_real_private.get("/likeTweet/"+tweet_id)
        .then(resp => {
            const data = resp.data;
            Callback(true, data);
        })
        .catch(err => {
            Callback(false, err);
        })
}


