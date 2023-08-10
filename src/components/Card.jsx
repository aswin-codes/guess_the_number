import React, { useEffect, useState } from "react";
import clown from "../assets/clown.png";

const Card = () => {
  //State Variables
  const [guess, setGuess] = useState("");
  const [number, setNumber] = useState(0);
  const [numberOfChances, setNumberOfChances] = useState(5);
  const [hint, setHint] = useState("");
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    initialTask();
  }, []);

  //Required functions

  const initialTask = () => {
    generateRandomNumber();
    setNumberOfChances(5);
    setCompleted(false);
    setHint("");
  };

  const generateRandomNumber = () => {
    const n = parseInt(Math.random() * 100);
    setNumber(n);
    //console.log(n);
  };

  const check = () => {
    const n = numberOfChances;
    setGuess("");
    if (n == 1 && guess != number) {
      //losing
      setCompleted(true);
      const text = `You lost. The correct number is ${number}.`;
      setHint(text);
    } else {
      const text = generateHintText(number, guess, n);
      setHint(text);
      if (n == 1 || guess == number) {
        setCompleted(true);
      }
      setNumberOfChances((no) => {
        return (no -= 1);
      });
    }
  };

  const generateHintText = (generated, guessed, currentChances) => {
    if (guessed == generated) {
      const x = 5 - currentChances + 1;
      return `That's correct. It took you ${x} ${x==1 ? 'turn' : 'turns'}, to correctly guess the number.`;
    } else if (guessed > generated) {
      return  `That's high.`
    } else {
      return "That's low."
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      check();
    }
  }

  return (
    <div className="bg-light p-5 mb-20 rounded-xl shadow-custom flex flex-col items-center">
      <h1 className="text-dark font-nunito font-bold text-2xl mb-4">
        Guess the Number
      </h1>
      <div className="flex-col flex md:flex-row justify-between w-full">
        <div className="m-2 md:my-5  md:mx-5 flex justify-center items-center">
          <img src={clown} alt="Clown" className="h-20 md:h-full" />
        </div>

        {completed ? (
          <div className="flex flex-col justify-between my-10">
            <div className="w-35 w-60">{hint}</div>
            <div className="flex items-center">
              <p>Wanna try again ?</p>
              <button
                onClick={() => initialTask()}
                className="ml-2 bg-blue-400 p-2 rounded-md text-sm"
              >
                Try again
              </button>
            </div>
          </div>
        ) : (
          <div className="my-10 flex flex-col justify-around">
            <div className="max-w-xs flex flex-col items-center mb-4">
              <p>
                Enter a number between 1 and 100. You have only{" "}
                {numberOfChances} chances...
              </p>
            </div>
            <div className="flex items-center">
              <input
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                type="number"
                placeholder="Enter"
                onKeyDown={handleKeyDown}
                className="border border-dark rounded text-md px-2 py-2"
              />
              <button
                onClick={() => check()}
                className="border border-dark p-2 ml-4 rounded hover:bg-dark hover:text-white transition ease-in-out duration-200"
              >
                Enter
              </button>
            </div>
            <div className="text-sm my-2">{hint}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
