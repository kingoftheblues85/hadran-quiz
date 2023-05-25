import styles from "./Footer.module.css";

export default function Footer(props) {
  return (
    <div className={`${styles.footer} col-xl-10 mx-xl-auto`}>
      <span>
        App by <a href="mailto:aaronlevy85@gmail.com">aaronlevy85@gmail.com</a>
      </span>
      <span>
        Content by <a href="http://www.zichru.com">Zichru</a>
      </span>
    </div>
  );
}
