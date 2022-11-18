import { data } from "./utils/data";

import "./App.css";
import { useState } from "react";

function App() {
  const [current, setCurrent] = useState(1);
  const [currectAnswers, setCurrectAnswers] = useState(0);
  const [msg, setMsg] = useState(null);
  const [isGame, setisGame] = useState(true);

  const handleclick = ({ target }) => {
    if (!isGame) return;
    let userGuess = target.id;
    let currectAnswer = data[current].fake;
    if (userGuess === currectAnswer) {
      console.log("correct!");
      setCurrectAnswers((prev) => prev + 1);
    } else {
      console.log("wrong!");
    }
    if (current < 10) {
      setMsg((prev) => data[current].msg);
      setCurrent((prev) => {
        return prev + 1;
      });
    } else {
      checkScore();
      setisGame((prev) => !prev);
    }
  };
  const checkScore = () => {
    currectAnswers > 5 ? console.log("win") : console.log("lost");
  };

  return (
    <div className="App">
      <h2>Is this image Real or Fake?</h2>
      <div className="main-box flex-row">
        <div className="dinamic-box ">
          <div>
            <button id="false" onClick={handleclick}>
              Real
            </button>
            <button id="true" onClick={handleclick}>
              Fake
            </button>
          </div>
        </div>
        <img
          className="main-img"
          src={require(`../public/${current}.jpeg`)}
          alt="img"
        />
      </div>
      {msg && (
        <div>
          <p>{msg}</p>
          <img
            className="more-info-img"
            src={
              isGame
                ? require(`../public/${current - 1}.jpeg`)
                : require(`../public/${current}.jpeg`)
            }
            alt="img"
          />
        </div>
      )}
    </div>
  );
}

export default App;
