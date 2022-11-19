import bcrypt from "bcryptjs";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styles from "./SigninForm.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../App";

function SigninForm() {
  localStorage.setItem("LoginToken", false);
  const navigate = useNavigate();
  const { setItems } = useContext(UserContext);
  const [UserName, getUserName] = useState("");
  const [PassWord, getPassWord] = useState("");
  const [UserNameFlag, setuserNameFlag] = useState(false);
  const [PassWordFlag, setPassWordFlag] = useState(false);
  
  const submitForm = async () => {
    if (UserName && PassWord) {
      const response = await fetch("/todo-users/verifyUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: UserName,
        }),
      });
      const data = await response.json();
      setItems(data.items);
      if (data.flag === 0) {
        setuserNameFlag(true);
      } else {
        bcrypt.compare(PassWord, data.password, function (err,isMatch) {
          if (!isMatch) {
            setPassWordFlag(true);
          } else {
            localStorage.setItem("LoginToken", true);
            navigate(`/AddItem/${UserName}/${data.id}`);
          }
        });
      }
    } else {
      alert("Username and Password cannot be empty!");
    }
  };

  return (
    <>
      <div className={styles.signin}>
        <h1>SIGN IN</h1>
        <div className={styles.name}>
          <TextField
            onChange={(e) => {
              getUserName(e.target.value);
              if (UserNameFlag) setuserNameFlag(false);
            }}
            label="Enter User Name"
            variant="outlined"
            required
          />
        </div>
        {UserNameFlag && (
          <div className={styles.username}>Invalid Username!</div>
        )}
        <div className={styles.pwd}>
          <TextField
            onChange={(e) => {
              getPassWord(e.target.value);
              if (PassWordFlag) setPassWordFlag(false);
            }}
            type="password"
            label="Enter Password"
            variant="outlined"
            required
          />
        </div>
        {PassWordFlag && (
          <div className={styles.passwrd}>Incorrect Password!</div>
        )}
        <div className={styles.bttn}>
          <Button variant="contained" onClick={submitForm}>
            Submit
          </Button>
        </div>
        <div className={styles.SignUpLink}>
          <a href="/signup">Not a user? Sign up</a>
        </div>
      </div>
    </>
  );
}

export default SigninForm;
