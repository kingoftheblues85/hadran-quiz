import Select from "react-select";
import { useState } from "react";
import styles from "./QuizSelectionForm.module.css";
import Button from "../UI/Button";

export default function QuizSelectionForm(props) {
  const [tractate, setSelection] = useState(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [startPage, setStartPage] = useState(null);
  const [startPageError, setStartPageError] = useState(false);
  const [endPage, setEndPage] = useState(null);
  const [endPageError, setEndPageError] = useState(false);
  const [allPagesToggle, setAllPagesToggle] = useState(true);

  const NUMBER_OF_QUESTIONS_OPTIONS = [5, 10, 20];

  const handleStartPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setStartPage(value);
    console.log(value);
  };

  const handleEndPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setEndPage(value);
    console.log(value);
  };

  const validateForm = () => {
    if (!tractate) {
      return false;
    }

    const isValid =
      allPagesToggle || (startPage && endPage && startPage <= endPage);
    setStartPageError(!isValid && !startPage);
    setEndPageError(!isValid && !endPage);

    return isValid;
  };

  const handleClick = () => {
    let form = {
      tractate: tractate,
      allPages: allPagesToggle,
      startPage: allPagesToggle ? 2 : startPage,
      endPage: allPagesToggle ? tractate.pages_bavli : endPage,
      numberOfQuestions: numberOfQuestions,
    };

    // Submit Form
    validateForm() && props.onSubmit(form);
  };

  return (
    <>
      <Select
        className={styles.select}
        onChange={(e) => setSelection(e)}
        options={props.options}
      />

      {tractate && (
        <div className={`${styles.optionsSection} row`}>

          <div className="col-sm-7 mb-2 mb-sm-0">
            <div className="mx-auto mx-sm-0">
              <label>Pages: </label>

              <select
                name="start_page"
                id="start_page"
                className={startPageError ? styles.error : ""}
                disabled={allPagesToggle}
                onChange={handleStartPageChange}
              >
                <option value=""></option>
                {Array.from({ length: tractate.pages_bavli - 1 }, (_, i) => (
                  <option key={i + 2} value={i + 2}>
                    {i + 2}
                  </option>
                ))}
              </select>

              <label>-</label>

              <select
                name="start_page"
                id="start_page"
                className={endPageError ? styles.error : ""}
                disabled={allPagesToggle}
                onChange={handleEndPageChange}
              >
                <option value=""></option>
                {Array.from({ length: tractate.pages_bavli - 1 }, (_, i) => (
                  <option placeholder={"End"} key={i + 2} value={i + 2}>
                    {i + 2}
                  </option>
                ))}
              </select>

              <div class="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value=""
                  id="flexCheckDefault"
                  checked={allPagesToggle}
                  onChange={() => setAllPagesToggle((prev) => !prev)}
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Entire Tractate
                </label>
              </div>
            </div>
          </div>

          <div className="col-sm">
            <div class="ms-sm-auto mx-auto mx-sm-0">
              <label>No. of Questions</label>
              <select
                name="numberOfQuestions"
                id="numberOfQuestions"
                onChange={(e) => setNumberOfQuestions(e.target.value)}
                defaultValue={numberOfQuestions}
              >
                {NUMBER_OF_QUESTIONS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <Button type="button" onClick={handleClick} disabled={!tractate}>
        Submit
      </Button>
    </>
  );
}
