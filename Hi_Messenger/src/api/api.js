import Axios from "axios"

export const GetAxiosInstance_jsonserver = Axios.create({
    baseURL : "http://localhost:3000",
    headers : {
        API_KEY : "salam"
    }
});

export const GetAxiosInstance_real = Axios.create({
    baseURL : "https://twitterapi.iran.liara.run/api",
    headers : {

    }
});

export const GetAxiosInstance_real_private = Axios.create({
    baseURL : "https://twitterapi.iran.liara.run/api",
    headers : {
        "x-auth-token" : localStorage.getItem("x-auth-token")
    }
});