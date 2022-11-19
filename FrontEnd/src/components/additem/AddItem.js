import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import CurrentList from "../currentList/currentList";
import styles from "./addItem.module.css";

export default function Additem() {
  const params = useParams();
  const navigate = useNavigate();
  const { setItems } = useContext(UserContext);
  const [inputs, setInput] = useState("");
  const userID = params.id;
  
  async function add() {
    if (inputs) {
      const response = await fetch("/todo/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: inputs, user: userID }),
      });
      const data = await response.json();

      setItems(data.items);
    } else alert("Input Field Empty");
  }

  function logout() {
    localStorage.setItem("LoginToken", false);
    navigate("/");
  }

  async function deleteAccount() {
    if (window.confirm("Do you want delete your account? ")) {
      localStorage.setItem("LoginToken", false);
      navigate("/");
      await fetch("/todo-users/deleteUser", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userID }),
      });
    }
  }

  return (
    <>
      <div>
        <div>
          <div className={styles.UserName}>{params.User} Logged In</div>
          <div onClick={logout} className={styles.Logout}>
            Logout
          </div>
          <a onClick={deleteAccount} href="" className={styles.delAccnt}>
            De-activate Account
          </a>
        </div>
        <div>
          Add New Item <input onChange={(e) => setInput(e.target.value)} />
          <button className={styles.submitbutton} onClick={add}>
            Submit
          </button>
        </div>
      </div>
      <CurrentList />
    </>
  );
}
