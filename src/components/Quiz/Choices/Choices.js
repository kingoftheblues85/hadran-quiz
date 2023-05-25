import { useState, useEffect } from "react";
import styles from "./Choices.module.css";
import { convertToGematria } from "../../../scripts/convertToGematria";
import Button from "../../UI/Button";

export default function Choices(props) {
  const question = props.question;
  const showResults = props.showResults;
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

  // Reset the selectedChoice every time the question changes
  useEffect(() => {
    setSelectedChoiceIndex(null);
  }, [question]);

  const handleChoiceClick = (index, value) => {
    // Evaluate the answer
    const result = parseInt(value) === props.question.daf;
    setAnswerIsCorrect(result);
    console.log(result);

    // Record which button was clicked
    setSelectedChoiceIndex(parseInt(index));

    // Pass up the result
    props.onAnswerIsSelected(result);
  };

  const getButtonClass = (index) => {
    // Update the button styles
    if (selectedChoiceIndex === index && answerIsCorrect) {
      return styles.correct;
    } else if (selectedChoiceIndex === index && !answerIsCorrect) {
      return styles.incorrect;
    } else {
      return ""
    }
  };

  return (
    <div className={`${styles.choices_container}`}>
      <div className="row">
        {props.question.choices.map((value, index) => (
          <div className="col-12 col-md-6">
            <Button
              className={`${getButtonClass(index)} mb-2`}
              key={index}
              value={value}
              disabled={showResults}
              onClick={() => handleChoiceClick(index, value)}
            >
              {convertToGematria(value)}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
