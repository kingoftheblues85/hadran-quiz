import styles from "./Results.module.css";
import { convertToGematria } from "../../../scripts/convertToGematria";
import Button from "../../UI/Button";

export default function Results(props) {
  const MAX_SCORE = props.object_list.length * 10;

  const evaluateScore = () => {
    // Evaluate final score
    return ((props.score / MAX_SCORE) * 100).toFixed(0);
  };

  const calculateMessage = () => {
    const percentageScore = evaluateScore();

    if (percentageScore >= 85) {
      return "You have mastered this topic!";
    } else if (percentageScore >= 75) {
      return "You have a very strong understanding of this topic.";
    } else if (percentageScore >= 65) {
      return "You have a strong understanding of this topic.";
    } else if (percentageScore >= 55) {
      return "You have a good understanding of this topic, but keep reviewing and you'll do better!";
    } else if (percentageScore >= 45) {
      return "You have a basic understanding of this topic. More review is recommended.";
    } else {
      return "You need to improve your understanding of this topic.";
    }
  };

  return (
    <>
      <h3>You scored {props.score} points</h3>

      <h4>{calculateMessage()}</h4>

      <div className={styles.results_container}>
        {props.object_list.map((obj, index) => (
          <div className={styles.question} key={index}>
            <span>
              <h4 key={obj.id}>{index + 1}:</h4>
            </span>

            <div className={styles.qa}>
              <span>
                <p>On what daf is the following topic discussed?</p>
                <h3>{obj.question}</h3>
              </span>
              <span>
                <h3>
                  Answer: Daf {convertToGematria(obj.choices[obj.answer])}
                  {/* <button className="btn btn-info"><span class="ms-3 material-symbols-outlined">info</span></button> */}
                </h3>
              </span>
            </div>

            <span className={styles.badge}>
              <span
                className={
                  obj.answeredCorrectly ? styles.correct : styles.incorrect
                }
              >
                <span className={"material-symbols-outlined "}>
                  {obj.answeredCorrectly ? "check" : "close"}
                </span>
              </span>
            </span>
          </div>
        ))}
      </div>

      <Button type="button" onClick={() => props.onDismiss()}>
        Dismiss
      </Button>
    </>
  );
}
