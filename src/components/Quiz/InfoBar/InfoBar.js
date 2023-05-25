import { useState, useEffect } from "react";
import Timer from "../Timer/Timer";
import styles from "./InfoBar.module.css";

export default function InfoBar(props) {
  const result = props.result;
  // can probably get rid of this state
  const [startTimer, setStartTimer] = useState();
  const [timesUp, setTimesUp] = useState(false);

  useEffect(() => {
    setTimesUp(false);
    setStartTimer(true);
  }, [props.questionIndex]);

  useEffect(() => {
    result != null && setStartTimer(false);
  }, [result]);

  const handleTimesUp = () => {
    setStartTimer(false);
    setTimesUp(true);
    props.onTimesUp(); // Pass the state up
  };

  return (
    <div className={`${styles.info_container}`}>
      {/* <div className={styles.title}>
        <h3>{props.title ? props.title : "[Title]"}</h3>
      </div> */}

      <div className={styles.content}>
        <div className={`col-4`}>
          Question {props.questionIndex + 1} of {props.totalQuestions}
        </div>

        <div className={`col-4 text-center`}>
        

            {/* Display result message */}
            {timesUp && <span>Times Up!</span>}

            {(!timesUp && result != null) && (result === true ? (
              <span className={`${styles.avatar} ${styles.correct} mx-auto`}>
                  <span className={"material-symbols-outlined "}>check</span>
                </span>
              ) : (
                <span className={`${styles.avatar} ${styles.incorrect} mx-auto`}>
                  <span className={"material-symbols-outlined "}>close</span>
                </span>
              ))}

            {/* Display Timer */}
            {startTimer && <Timer onTimesUp={handleTimesUp} />}

        </div>
        <div className={`col-4 text-end`}>
          <span className="">{props.score ? props.score +" Points": "0 Points"}</span>
        </div>
      </div>
    </div>
  );
}

/*
{
          styles.message +
          " " +
          (result != null &&
            (result === true ? styles.correct : styles.incorrect))
}
*/
