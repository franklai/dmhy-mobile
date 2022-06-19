import { useState } from "react";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [message, setMessage] = useState("Input your keyword");
  const [keyword, setKeyword] = useState("孔明");
  const [items, setItems] = useState([]);

  const handleSubmit = async (event) => {
    console.log("keyword is", keyword);

    setMessage(`Searching for '${keyword}'`);
    const resp = await fetch(`/api/rss?keyword=${encodeURIComponent(keyword)}`);
    const json = await resp.json();
    console.log(json);
    setItems(json.items);

    console.log("items:", items);

    setMessage(`Results of '${keyword}'`);
  };
  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <div className={styles.container}>
      <input type="text" value={keyword} onChange={handleChange}></input>
      <button onClick={handleSubmit}>Submit</button>
      <div>{message}</div>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.link}>
              <a href={item.enclosures[0].url}>🧲</a> {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
