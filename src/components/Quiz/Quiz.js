// https://www.britannica.com/quiz/facts-you-should-know-the-human-body-quiz

import { useState, useEffect } from "react";
import styles from "./Quiz.module.css";
import InfoBar from "./InfoBar/InfoBar";
import Question from "./Question/Question";
import Choices from "./Choices/Choices";
import Results from "./Results/Results";
import QuizSelectionForm from "./QuizSelectionForm";
import quiz_options from "../../data/quiz_options.json";
import Button from "../UI/Button";

export default function Quiz(props) {
  const [index, setIndex] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(null);
  const [showFinalResults, setShowFinalResults] = useState(null);

  const [quizModule, setQuizModule] = useState(null);
  const [quiz, setQuiz] = useState(null);

  const generateQuestions = () => {
    const numberOfQuestions = quizModule.numberOfQuestions;
    const numberOfChoices = 3;
    const startPage = quizModule.startPage;
    const endPage = quizModule.endPage;
    const questions = [];
    const numberOfPages = endPage - startPage + 1;
    let numberOfPossibleQuestions = numberOfPages * 3;

    while (
      questions.length < numberOfQuestions &&
      numberOfPossibleQuestions > 0
    ) {
      // Generate a random number corresponding to a page within the user-selected range
      const random_number =
        Math.floor(Math.random() * (endPage - startPage + 1)) + startPage; // Generate a random integer between startPage and endPage (inclusive)

      // Select a page using the random number
      const daf = quizModule.module.find((obj) => obj.daf === random_number);

      // Select a random datapoint on the page
      const random_datapoint = Math.floor(Math.random() * daf.data.length);

      // Generate question
      const question = {
        id: parseInt(daf.daf + "" + daf.data[random_datapoint].id),
        daf: daf.daf,
        question: daf.data[random_datapoint].title,
        answer: null,
        choices: [],
      };

      // Generate choices
      while (question.choices.length < numberOfChoices) {
        // const random_daf = Math.floor(Math.random() * quizModule.module.length) + 1;
        const random_daf =
          Math.floor(Math.random() * (endPage - startPage + 1)) + startPage; // Generate a random integer between startPage and endPage (inclusive)

        // Check if the choice already exists in the array
        if (!question.choices.includes(random_daf)) {
          question.choices.push(random_daf.toString());
        }
      }

      // Insert the answer into a randomly generated index in the choices array
      const random_index = Math.floor(Math.random() * question.choices.length); // generate a random index

      // insert the answer at the random index
      question.choices.splice(random_index, 0, daf.daf.toString());

      // update the answer key with the index for the correct answer
      question.answer = random_index;

      // check if the question is unique
      if (questions.find((q) => q.id === question.id)) {
        // Duplicate question, generate a new one
        console.log("duplicate found");
        continue;
      }

      // Unique question, add it to the array and the set
      questions.push(question);

      // Decrease the count of possible questions by 1
      numberOfPossibleQuestions--;
    }
    return questions;
  };

  useEffect(() => {
    if (quizModule) {
      setIndex(0);

      const subject =
        quizModule.tractate.value.charAt(0).toUpperCase() +
        quizModule.tractate.value.slice(1);
      const title = quizModule.allPages
        ? `${subject}`
        : `${subject} (${quizModule.startPage} - ${quizModule.endPage})`;
      const questions = generateQuestions();

      // Load the quiz
      setQuiz(() => ({
        id: 1,
        title: title,
        questions: questions,
      }));

      // Set the title
      props.onTitle(title);
    }
  }, [quizModule]); // Generate questions

  const handleQuizSelected = (form) => {
    // Set the module to the selected quiz tractate
    const module = form.tractate.value;

    // load the module file via import
    async function importModule() {
      const file = await import(
        `../../data/${module.replace(/\s/g, "").toLowerCase()}_data.json`
      );
      form.module = file.default;
      setQuizModule(form);
    }
    importModule();
  };

  const updateScore = (result, timesUp = false) => {
    const POINTS_CORRECT = 10;
    const POINTS_INCORRECT = 0;

    // answer is correct
    if (result === true && !timesUp) {
      setScore((prevScore) => prevScore + POINTS_CORRECT);
      quiz.questions[index].answeredCorrectly = true;
    }

    // answer is incorrect
    if (result === false && !timesUp) {
      setScore((prevScore) => prevScore + POINTS_INCORRECT);
      quiz.questions[index].answeredCorrectly = false;
    }

    // time ran out
    if (timesUp) {
      setScore((prevScore) => prevScore);
      quiz.questions[index].answeredCorrectly = false;
    }

    // Display the results
    setResult(result);
    setShowResults(true);
  };

  async function saveScoreToDatabase(score) {
    const data = {
      name: prompt('Enter your name:'),
      dateTime: new Date(8.64e15).toString(),
      tractate: quizModule.tractate.value,
      score: score,
      
    }
    const result = await fetch('https://hadran-quiz-default-rtdb.firebaseio.com/scores.json', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'Application/Json',
      }

    })
  }

  const handleTimesUp = () => {
    updateScore(false, true);
  };

  const handleAnswerIsSubmitted = (result) => {
    // Evaluate the answer
    // const result = answer === quiz.questions[index].answer;

    // Update the score
    console.log(result);
    updateScore(result);
  };

  const nextQuestion = () => {
    if (index >= quiz.questions.length - 1) {
      // Quiz is over, Show the final results
      setShowFinalResults(true);

      // Record the final score into the database
      // userID, date, time, tractae, page range, numQs, score
      saveScoreToDatabase(score);
      return;
    }

    // Continue
    setShowResults();
    setResult();
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handleQuizIsComplete = () => {
    props.onTitle(null);
    setIndex(null);
    setScore(null);
    setResult(null);
    setShowResults(null);
    setShowFinalResults(null);
    setQuizModule(null);
    setQuiz(null);
  };

  return (
    <>
      {!quiz && (
        <QuizSelectionForm
          options={quiz_options}
          onSubmit={handleQuizSelected}
        />
      )}

      {showFinalResults && (
        <Results
          object_list={quiz.questions}
          score={score}
          onDismiss={handleQuizIsComplete}
        />
      )}

      {quiz && !showFinalResults && (
        <>
          <InfoBar
            questionIndex={index}
            totalQuestions={quiz.questions.length}
            result={result}
            score={score}
            // activeQuestion={activeQuestion}
            title={quiz.title}
            onTimesUp={handleTimesUp}
          />

          <Question
            key={quiz.questions[index].id}
            index={quiz.questions[index].id}
            question={quiz.questions[index]}
          />

          <Choices
            question={quiz.questions[index]}
            onAnswerIsSelected={handleAnswerIsSubmitted}
            showResults={showResults}
          />

          {result != null && (
            <Button onClick={nextQuestion}>
              Continue
            </Button>
          )}

          <div className="text-center">
            <hr />
            <button className="btn btn-secondary" onClick={handleQuizIsComplete}>Exit Quiz</button>
          </div>
        </>
      )}
    </>
  );
}
