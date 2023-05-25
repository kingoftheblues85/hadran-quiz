import styles from "./Question.module.css";

export default function Question(props) {
  return (
    <>
      <div className={styles.question}>
        {/* <p>[ Daf: {props.question.daf} ]</p>  */}
        <p>On what daf is the following topic discussed?</p>
        <h4>{props.question.question}</h4>
      </div>
    </>
  );
}
