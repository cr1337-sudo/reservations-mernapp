import { useContext, useRef, useState } from "react";
import "./profile.scss";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Box, TextField, alpha, styled, Button, Stack } from "@mui/material";
import { AuthContext } from "../../context/authContext/AuthContext";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import { logOut } from "../../context/authContext/apiCalls";
import { loginSuccess } from "../../context/authContext/AuthActions";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { validatePassword } from "./utils";
import { encryptData, decryptData } from "../../context/authContext/utils";
import { storage } from "../../firebase/firebase.js";

const Profile = () => {
  const history = useHistory();
  const { user, dispatch } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [edit, setEdit] = useState(false);
  const [userDataEdit, setUserDataEdit] = useState({
    name: user.name,
    email: user.email,
    phone: user.number || null,
    profilePic: user.profilePic || null,
  });
  const name = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const password1 = useRef(null);
  const password2 = useRef(null);

  const [passwordError, setPasswordError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  const changePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const uploadPhoto = async () => {
    const uploadTask = storage.ref(`photos/${photo.name}`).put(photo);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("photos")
          .child(photo.name)
          .getDownloadURL()
          .then((url) => {
            setUploadedPhoto(url.toString());
          });
      }
    );
  };

  const handleUpload = async (e) => {
    let newData = {
      name: name.current.value,
      email: email.current.value,
      phone: phone.current.value,
      password: password1.current.value,
      profilePic: uploadedPhoto || null,
    };
    console.log(uploadedPhoto)
    if (
      validatePassword(
        {
          password1: password1.current.value || "",
          password2: password2.current.value || "",
        },
        setPasswordError
      )
    ) {
      if (newData.password.trim() === "") delete newData.password;
      if (newData.phone.trim() === "") delete newData.phone;

      console.log(newData);
      setUpdating(true);

      axios
        .put(`/api/users/${user._id}`, newData, {
          headers: {
            token: `Bearer ${user.token}`,
          },
        })
        .then((data) => {
          const localStorageUser = decryptData(
            localStorage.getItem("user"),
            process.env.REACT_APP_SECRET_WORD
          );

          const localStorageNewUser = {
            token: localStorageUser.token,
            ...data.data,
          };

          dispatch(loginSuccess(localStorageNewUser));
          setUserDataEdit(localStorageNewUser);
          setUpdating(false);
          setEdit(false);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (photo) {
      uploadPhoto().then(handleUpload());
    } else await handleUpload();
  };

  const handleLogout = async () => {
    await logOut(dispatch);
  };

  const CssTextField = styled(TextField)({
    ".MuiFilledInput-input ": {
      background: "white",
    },
  });

  return (
    <div className={`profile-container ${theme === "light" ? "light" : ""}`}>
      <div class="top-title">
        <h2>PROFILE</h2>
        <Link to="/logout" className="logout" onClick={handleLogout}>
          LOGOUT <PowerSettingsNewIcon className="icon" />
        </Link>
      </div>
      <div className="center-main">
        <div className="left-side">
          <h4>Profile pic</h4>
          <img
            src={
              user.profilePic ||
              "https://www.kindpng.com/picc/m/111-1114911_person-icon-png-download-icono-usuario-png-transparent.png"
            }
            alt="Person"
          />
          {edit ? (
            <input placeholder="New photo" type="file" onChange={changePhoto} />
          ) : null}
        </div>
        <div class="right-side">
          {/*
          <form action="" onSubmit={handleSubmit}>
      */}
          <Box
            component="form"
            noValidate
            className="form"
            sx={{
              display: "grid",
              gridTemplateColumns: { sm: "1fr 1fr" },
              gap: 2,
            }}
            onSubmit={handleSubmit}
          >
            <h4>Personal Info</h4>
            <CssTextField
              disabled={!edit}
              inputRef={name}
              variant="filled"
              label="Name"
              type="text"
              name="name"
              defaultValue={userDataEdit.name}
            />
            <CssTextField
              disabled={!edit}
              inputRef={email}
              variant="filled"
              label="Email"
              type="email"
              name="email"
              defaultValue={userDataEdit.email}
            />
            <CssTextField
              disabled={!edit}
              inputRef={phone}
              variant="filled"
              label="Phone Number"
              type="number"
              name="phone"
              value={userDataEdit?.phone || null}
            />

            {user.name !== "prueba" && user.email !== "prueba@prueba.com" ? (
              <>
                <h4 className="h4-password">Change Password</h4>
                <CssTextField
                  disabled={!edit}
                  inputRef={password1}
                  variant="filled"
                  label="Password"
                  type="password"
                  name="password1"
                  autoComplete={false}
                />

                <CssTextField
                  disabled={!edit}
                  inputRef={password2}
                  variant="filled"
                  label="Confirm Password"
                  type="password"
                  name="password2"
                />
                {passwordError ? (
                  <p className="error">{passwordError}</p>
                ) : null}
              </>
            ) : null}
            <Stack direction="row" spacing={2}>
              {edit ? (
                <>
                  <Button
                    className={updating ? "disabled" : null}
                    disabled={updating}
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                    Confirm Edit
                  </Button>
                  <Button
                    className={updating ? "disabled" : null}
                    variant="contained"
                    color="error"
                    disabled={updating}
                    onClick={() => {
                      setEdit(false);
                      setUserDataEdit({
                        name: user.name,
                        email: user.email,
                        phone: user?.phone || "",
                      });
                      setPasswordError(null);
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    setEdit(true);
                    e.preventDefault();
                  }}
                >
                  Edit
                </Button>
              )}
            </Stack>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
