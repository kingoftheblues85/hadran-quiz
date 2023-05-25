import { useState, useEffect } from "react";
import styles from "./Timer.module.css";

export default function Timer(props) {
  const TIME = 30
  const [timeLeft, setTimeLeft] = useState(TIME);

  useEffect(() => {
    if (timeLeft <= 0) {
      props.onTimesUp(); // Pass the state up
      return;
    }
    setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  }, [timeLeft, props]);

  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60

  const formatTime = (minutes, seconds) => {
    let formattedMinutes = String(minutes).padStart(2, '0')
    let formattedSeconds = String(seconds).padStart(2, '0')
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  return (
    <>
      {/* Display Timer */}
      <span className={styles.timer}>{formatTime(minutes,seconds)}</span>
    </>
  );
}
