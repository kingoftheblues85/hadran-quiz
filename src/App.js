import { useState } from "react";
import styles from "./App.css";
import Quiz from "./components/Quiz/Quiz";
import TopNav from "./components/UI/TopNav";
import Modal from "./components/UI/Modal";

import Footer from "./components/UI/Footer";
import HighScores from "./components/Quiz/Results/HighScores";
import Button from "./components/UI/Button";

function App() {
  const [title, setTitle] = useState("Hadran Quiz");
  const [showModal, setShowModal] = useState();
  const [showHighScores, setShowHighScores] = useState();

  const toggleViewHighScores = () => {
    setShowHighScores((prev) => {
      return !prev;
    });
  };

  return (
    <div className="container-lg">
      <div className={`col-xl-10 mx-xl-auto`}>
        {showModal && (
          <Modal
            title="Error"
            message={["Quiz no good"]}
            onDismiss={() => setShowModal()}
          />
        )}

        <div className="main_content">
          <TopNav title={title} />
          {!showHighScores && <Quiz onTitle={(title) => setTitle(title)} />}
          <div className="center">
            {showHighScores && <HighScores onDismiss={toggleViewHighScores} />}
            {!showHighScores && <a href="#" onClick={toggleViewHighScores}> View High Scores</a>}
          </div>
          <Footer />
        </div>
        
      </div>
    </div>
  );
}

export default App;
