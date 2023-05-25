import styles from "./TopNav.module.css";

export default function TopNav(props) {
  return (
    <div className={styles.topNav}>
      <h1>{props.title ? props.title : "Hadran"}</h1>
    </div>
  );
}
