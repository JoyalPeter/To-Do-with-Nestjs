import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import styles from "./currentList.module.css";
export default function CurrentList() {
  const [flag, setFlag] = useState(false);
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [edittedName, setEdittedName] = useState("");
  const { items } = useContext(UserContext);
  const { setItems } = useContext(UserContext);
  const params = useParams();
  const userID = params.id;

  async function deleteItem(itemId) {
    const response = await fetch("/todo/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: itemId, userId: userID }),
    });
    const data = await response.json();
    setItems(data.items);
  }

  async function editItem(id, name) {
    setItemId(id);
    setItemName(name);
    setFlag(!flag);
  }

  async function applyEdit() {
    if (edittedName) {
      const response = await fetch("/todo/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: itemId, item: edittedName, userId: userID }),
      });
      const data = await response.json();
      setItems(data.items);
      setFlag(!flag);
    } else {
      alert("Input Field Empty");
    }
  }

  return (
    <>
      {flag && (
        <div>
          Enter Edited Name{" "}
          <input
            placeholder={itemName}
            onChange={(e) => setEdittedName(e.target.value)}
          />
          <button className={styles.bt} onClick={applyEdit}>
            Submit
          </button>
        </div>
      )}
      <h3>Current List</h3>
      {items.map((item, index) => (
        <div className={styles.dispDiv}>
          <span className={styles.dispLine}>{index + 1})</span>
          <span className={styles.dispLine}>{item.item}</span>
          <button
            className={styles.bt}
            onClick={() => editItem(item.id, item.item)}
          >
            Edit
          </button>
          <button
            className={styles.bt}
            onClick={() => {
              deleteItem(item.id);
            }}
            disabled={flag}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
