import { useState, useEffect } from "react";
import styles from "./HighScores.module.css";
import { convertToGematria } from "../../../scripts/convertToGematria";
import Button from "../../UI/Button";

export default function HighScores(props) {
  const [scores, setScores] = useState([]);

  async function getHighScores() {
    const results = await fetch(
      "https://hadran-quiz-default-rtdb.firebaseio.com/scores.json"
    );

    const data = await results.json();

    let content = [];
    for (const key in data) {
      content.push({
        name: data[key].name,
        tractate: data[key].tractate,
        score: data[key].score,
      });
    }
    setScores(content);
    console.log(content);
  }

  useEffect(() => {
    getHighScores();
  }, []);

  return (
    <>
      <table className="table table-sm table-hover table-striped mx-auto my-3">
        <thead>
          <tr>
            <th className="py-3" colSpan="3"><h3>High Scores</h3></th>
          </tr>
        </thead>
        <thead className="bg-secondary text-white">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Tractate</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr>
              <td>{score.name}</td>
              <td>{score.tractate}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={() => props.onDismiss()}>Dismiss</Button>
    </>
  );
}
