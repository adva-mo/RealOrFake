import { data } from "./utils/data";

import "./App.css";
import { useState } from "react";

function App() {
  const [current, setCurrent] = useState(1);
  const [currectAnswers, setCurrectAnswers] = useState(0);
  const [msg, setMsg] = useState(null);
  const [isGame, setisGame] = useState(true);
  const [isWinner, setisWinner] = useState(null);

  const handleclick = ({ target }) => {
    if (!isGame) return;
    let userGuess = target.id;
    let currectAnswer = data[current].fake;
    userGuess === currectAnswer && setCurrectAnswers((prev) => prev + 1);
    if (current < 10) {
      setMsg((prev) => `${data[current].fake}: ${data[current].msg}`);
      setCurrent((prev) => prev + 1);
    } else {
      setMsg((prev) => data[current].msg);
      setisGame((prev) => !prev);
      checkScore();
    }
  };
  const checkScore = () => {
    currectAnswers > 5 ? setisWinner(true) : setisWinner(false);
  };

  return (
    <div className="App">
      <h1>Is this image Real or Fake?</h1>
      <div className="main-box flex-row">
        {isGame ? (
          <div className="dinamic-box flex-row">
            <button id="real" onClick={handleclick}>
              Real
            </button>
            <button id="fake" onClick={handleclick}>
              Fake
            </button>
          </div>
        ) : (
          <div className="dinamic-box">
            {isWinner ? <p>You won!</p> : <p>lost!</p>}
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              new game
            </button>
          </div>
        )}
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
