import {GetAxiosInstance_real, GetAxiosInstance_real_private} from "./api";

export const Login_auth = (user, Callback) => {
  GetAxiosInstance_real.post("/login", user)
    .then((resp) => {
      const data = resp.data;
      Callback(true, data);
    })
    .catch((err) => {
      Callback(false, err);
    })
};

export const Signin_auth = (user, Callback) => {
    GetAxiosInstance_real.post("/register", user)
        .then((resp) => {
            const data = resp.data;
            Callback(true, data);
        })
        .catch((err) => {
            Callback(false, err);
        })
};

export const Upload_profile_image = (photo, Callback) => {
    GetAxiosInstance_real_private.post("/uploadUserPhoto", photo)
        .then((resp) => {
            const data = resp.data;
            Callback(true, data);
        })
        .catch((err) => {
            Callback(false, err);
        })
};

