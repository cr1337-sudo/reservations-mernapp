 export const validatePassword = (passwords, setPasswordError) => {
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


