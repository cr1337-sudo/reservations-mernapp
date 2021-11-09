import { useContext, useEffect, useState } from "react";
import "./profile.scss";
import { AuthContext } from "../../context/authContext/AuthContext";
import {ThemeContext} from "../../context/themeContext/ThemeContext"
import axios from "axios";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const {theme} = useContext(ThemeContext
  )
  const [edit, setEdit] = useState(false);
  const [userDataEdit, setUserDataEdit] = useState({
    name: user.name,
    email: user.email,
  });
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

  const handleChange = (e) => {
    setUserDataEdit({
      ...userDataEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newData = {
      ...userDataEdit,
      password: passwords.password1,
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
          <form action="" onSubmit={handleSubmit}>
            <h4>Personal Info</h4>
            <label for="name">Name</label>
            <input
              className={edit ? "disabled" : undefined}
              name="name"
              type="text"
              placeholder="Name"
              disabled={!edit}
              value={userDataEdit.name}
              onChange={handleChange}
            />
            <label for="email">Email</label>
            <input
              className={edit ? "disabled" : undefined}
              name="email"
              type="email"
              placeholder="Email"
              disabled={!edit}
              value={userDataEdit.email}
              onChange={handleChange}
            />
            <label for="phone">Phone Number</label>
            <input
              className={edit ? "disabled" : undefined}
              name="phone"
              type="number"
              placeholder="Phone number"
              disabled={!edit}
              value={userDataEdit?.phone || ""}
              onChange={handleChange}
            />

            <h4 className="h4-password">Change Password</h4>
            <label for="password1">Password</label>
            <input
              className={edit ? "disabled" : undefined}
              name="password1"
              type="password"
              placeholder="Password"
              disabled={!edit}
              value={passwords.password1}
              onChange={(e) => {
                setPasswords({ ...passwords, password1: e.target.value });
              }}
            />
            <label for="password2">Confirm password</label>
            <input
              className={edit ? "disabled" : undefined}
              name="password2"
              type="password"
              placeholder="Confirm password..."
              disabled={!edit}
              value={passwords.password2}
              onChange={(e) => {
                setPasswords({ ...passwords, password2: e.target.value });
              }}
            />

            {passwordError ? <p className="error">{passwordError}</p> : null}
            <div class="buttons">
              {edit ? (
                <>
                  <button
                    className={
                      updating ? "post-button disabled" : "post-button"
                    }
                    disabled={updating}
                  >
                    Confirm Edit
                  </button>
                  <button
                    className={
                      updating ? "cancel-button disabled" : "cancel-button"
                    }
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
                  </button>
                </>
              ) : (
                <button
                  className="edit-button"
                  onClick={(e) => {
                    setEdit(true);
                    e.preventDefault();
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
