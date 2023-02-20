import React, {Fragment, useRef, useState} from "react";
import Profile from "./Profile";
import Best_tweeters from "./Best_tweeters";
import Logout from "./Logout";
import {ButtonBase, Grid, Menu, MenuItem} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Upload_profile_image} from "../../../api/api_auth";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import Change_language from "./Change_language";

const Leftsidebar = ({className}) => {
    const [anchor_menu, setAnchor_menu] = useState(null);
    const [profile_image, setProfile_image] = useState(null);
    const [profile_image_path, setProfile_image_path] = useState(null);

    const get_image = () => {
        if (profile_image_path){
            return profile_image_path;
        }
        if (localStorage.getItem("image") && localStorage.getItem("image") !== "undefined"){
            return localStorage.getItem("image");
        }
        return "/images/user_profile.png";
    }


    const user = {
        name : localStorage.getItem("name"),
        id : localStorage.getItem("username"),
        img : get_image()
    };

    const {t} = useTranslation();

    const input_Ref = useRef(null);

    const handle_avatar_change = (e) => {
      if (e.target.files && e.target.files.length>0){
          setProfile_image(e.target.files[0]);

          const reader = new FileReader();
          reader.onload = (e) =>{
              setProfile_image_path(e.target.result);
          }
          reader.readAsDataURL(e.target.files[0]);

          const form_data = new FormData();
          form_data.append("image", e.target.files[0]);

          Upload_profile_image(form_data, (is_ok, data)=> {
              if (!is_ok){
                  return toast.error(data.response.data.message);
              }
              toast.success(t("suc_edit_profile"));
              localStorage.setItem("image", data.imagePath);
          })

      }
    }

    const handle_toggle = (e) => {
      if (anchor_menu){
          setAnchor_menu(null);
      }else {
          setAnchor_menu(e.currentTarget);
      }
    };

    return(
        <div className={className}>
            <div onClick={handle_toggle}>
                <Profile name={user.name} id={user.id} img={user.img}/>
            </div>
            <input style={{display : "none"}} type={"file"} ref={input_Ref} onChange={handle_avatar_change}/>
            <Best_tweeters/>
            <Menu open={Boolean(anchor_menu)} onClose={()=>setAnchor_menu(null)} anchorEl={anchor_menu}>
                <MenuItem style={{
                    justifyContent : "end"
                }}>
                    <ButtonBase onClick={()=>{
                        input_Ref.current.click();
                    }}>
                        <p className={"logout_text"}>{t("change_Profile")}</p>
                        <AccountCircleIcon/>
                    </ButtonBase>
                </MenuItem>
                <MenuItem>
                    <Change_language/>
                </MenuItem>
                <MenuItem>
                    <Logout/>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Leftsidebar