import Button from "./Button";
import styles from "./Modal.module.css";

export default function Modal(props) {
  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          {props.message}
        </div>
        <footer className={styles.footer}>
          <Button onClick={props.onDismiss}>Close</Button>
        </footer>
      </div>
    </>
  );
}
