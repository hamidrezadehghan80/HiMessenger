import React from "react";
import Layout from "./Layout/Layout";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Auth from "../pages/auth/auth";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Tweet_provider} from "../Context/Tweeter_context";
import {Layout_provider} from "../Context/Layout_context";


const App = () => {

    return(
        <Layout_provider>
            <Tweet_provider>
                <div>
                    <BrowserRouter>
                        <Routes>
                            {/*<Route path={"/login"} element={<Auth/>}/>*/}
                            {/*<Route exact path={"/*"} element={<Layout/>}/>*/}
                            <Route path={"/login"} element={<Public_rout>
                                <Auth/>
                            </Public_rout>}/>
                            <Route exact path={"/*"} element={<Private_rout>
                                <Layout/>
                            </Private_rout>}/>
                        </Routes>
                    </BrowserRouter>
                    <ToastContainer theme={"colored"}/>
                </div>
            </Tweet_provider>
        </Layout_provider>
    )
}

export default App

const is_login = () => !!localStorage.getItem("x-auth-token");
const is_login_flag = is_login();

const Public_rout = ({children}) => {
    if (is_login_flag){
        return <Navigate to={"/"}/>;
    }
    return children;
}

const Private_rout = ({children}) => {
    if (!is_login_flag){
        return <Navigate to={"/login"}/>
    }
    return children
}
