import React, {useEffect, useState, useTransition} from "react";
import Row from "../Row";
import Rightsidebar from "./rightsidebar/Rightsidebar";
import Leftsidebar from "./leftsidebar/Leftsidebar";
import "./layout_styles.css"
import Home from "../../pages/home/Home";
import Tweet_By_Hashtag from "../../pages/Tweet_By_hashtag/Tweet_By_Hashtag";
import Tweet_By_Tweeter from "../../pages/Tweet_By_tweeters/Tweet_By_Tweeter";
import {Route, Routes, useNavigate} from "react-router-dom";
import Not_Found from "../../pages/Not_found/Not_Found";
import {Get_Profile} from "../../api/api_tweeter";
import {toast} from "react-toastify";
import ReactLoading from "react-loading"
import {useTranslation} from "react-i18next";
import {useMediaQuery, useTheme} from "@mui/material";
import Tweeter_Drawer from "../Drawer/Tweeter_Drawer";

const Layout = () => {

    const navigate = useNavigate();
    const [wait, setWait] = useState(true);
    const {t} = useTranslation();

    const theme = useTheme();
    const is_tablet_mod = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        Get_Profile((is_ok, data)=>{
            if(!is_ok){
                toast.error(data.message);
                localStorage.clear();
                setWait(false);
                return navigate("/login");
            }else{
                setWait(false);
                localStorage.setItem("name", data.name);
                localStorage.setItem("username", data.username);
                localStorage.setItem("image", data.image);
                localStorage.setItem("x-auth-token", data["x-auth-token"]);
            }
        })
    }, []);

    if (wait){
        return (
            <div style={{
                width : "100%",
                height : "100vh",
                display : "flex",
                justifyContent : "center",
                alignItems : "center"
            }}>
                {/*<CircularProgress color={"secondary"}/>*/}
                <ReactLoading
                    color={"#c979b7"}
                    type={"bars"}
                />
                <h3 style={{
                    marginRight : "1rem"
                }}>
                    {t("wait")}
                </h3>
            </div>
        );
    }
    else {
        return(
            <Row className={"root"}>
                {is_tablet_mod ? <Tweeter_Drawer/> : <Rightsidebar className={"rightsidebar"}/>}
                <hr className={"divider"}/>
                <div className={"mainbar"}>
                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path={"Tweeter/:Id/:Username"} element={<Tweet_By_Tweeter/>}/>
                        <Route path={"Hashtag/:Tag"} element={<Tweet_By_Hashtag/>}/>
                        <Route path={"*"} element={<Not_Found/>}/>
                    </Routes>
                </div>
                <hr className={"divider"}/>
                <Leftsidebar className={"leftsidebar"}/>
            </Row>
        );
    }
}

export default Layout