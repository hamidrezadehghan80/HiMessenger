import React from "react";
import {Drawer} from "@mui/material";
import Rightsidebar from "../Layout/rightsidebar/Rightsidebar";
import {toggle_drawer, Use_Layout_Dispatch, Use_Layout_State} from "../../Context/Layout_context";

const Tweeter_Drawer = (props) => {
    const {drawer_open} = Use_Layout_State();
    const drawer_dispatch = Use_Layout_Dispatch();
    return(
        <Drawer
            anchor={"right"}
            open={drawer_open}
            onClose={() => {
                toggle_drawer(drawer_dispatch);
            }}
        >
            <Rightsidebar/>
        </Drawer>
    )
}

export default Tweeter_Drawer