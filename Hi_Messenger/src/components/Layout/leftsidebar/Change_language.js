import React, {useState} from "react";
import "./Change_language_styles.css"
import {ButtonBase} from "@mui/material";
import TranslateIcon from '@mui/icons-material/Translate';
import {useTranslation} from "react-i18next";

const Change_language = (props) => {

    const {t, i18n} = useTranslation();
    const [language, setLanguage] = useState("en");

    const change_language_handler = () => {
        if (language === "en"){
            setLanguage("fa");
            i18n.changeLanguage("fa")
        }else {
            setLanguage("en");
            i18n.changeLanguage("en");
        }
    }
    
    return(
        <ButtonBase onClick={change_language_handler}>
            <p className={"logout_text"}>{t("change_language")}</p>
            <TranslateIcon/>
        </ButtonBase>
    )
}

export default Change_language