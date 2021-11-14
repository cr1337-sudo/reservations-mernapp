import { useContext, useRef, useState } from "react";
import "./profile.scss";
import { Box, TextField, alpha, styled, Button, Stack } from "@mui/material";
import { AuthContext } from "../../context/authContext/AuthContext";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import axios from "axios";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [edit, setEdit] = useState(false);
  const [userDataEdit, setUserDataEdit] = useState({
    name: user.name,
    email: user.email,
  });
  const name = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const password1 = useRef(null);
  const password2 = useRef(null);

  const [passwords, setPasswords] = useState({
    password1: "",
    password2: "",
  });

  const [passwordError, setPasswordError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const validatePassword = () => {
    const { password1, password2 } = passwords;
    if (password1.length === 0 && password2.length === 0) return true;

    if (password1.length < 6 || password2.length < 6)
      return setPasswordError("Password must contain at least 6 letters");

    if (password1 !== password2)
      return setPasswordError("Passwords don't match");

    if (password1 === password2 && password1.length >= 6) {
      setPasswordError(null);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newData = {
      name: name.current.value,
      email: email.current.value,
      phone: phone.current.value,
      password: password1.current.value,
    };

    if (validatePassword()) {
      setUpdating(true);
      axios
        .put(`/users/${user._id}`, newData, {
          headers: {
            token: `Bearer ${user.token}`,
          },
        })
        .then((data) => {
          const localStorageUser = JSON.parse(localStorage.getItem("user"));
          const localStorageNewUser = {
            token: localStorageUser.token,
            ...data.data,
          };
          localStorage.setItem("user", JSON.stringify(localStorageNewUser));
          setUserDataEdit(localStorageNewUser);
          setUpdating(false);
          setEdit(false);
        });
    }
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
      </div>
      <div className="center-main">
        <div className="left-side">
          <h4>Profile pic</h4>
          <img
            src="https://www.kindpng.com/picc/m/111-1114911_person-icon-png-download-icono-usuario-png-transparent.png"
            alt="Person"
          />
          <input placeholder="New photo" type="file" />
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
              defaultValue={userDataEdit?.phone || ""}
            />
            {/*
            <input
              className={edit ? "disabled" : undefined}
              name="name"
              type="text"
              placeholder="Name"
              disabled={!edit}
              value={userDataEdit.name}
              onChange={handleChange}
            />
            */}

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
                  defaultValue={passwords.password1}
                  onChange={(e) => {
                    setPasswords({ ...passwords, password1: e.target.value });
                  }}
                />

                <CssTextField
                  disabled={!edit}
                  inputRef={password2}
                  variant="filled"
                  label="Confirm Password"
                  type="password"
                  name="password2"
                  defaultValue={passwords.password2}
                  onChange={(e) => {
                    setPasswords({ ...passwords, password1: e.target.value });
                  }}
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
                    className={
                      updating ? "disabled" : null
                    }
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
                      setPasswords({
                        password1: "",
                        password2: "",
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
