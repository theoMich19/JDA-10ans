"use client";
import { useEffect, useRef, useState } from "react";

import { PreviousAttempts, RemainingAttempts } from "../attemps/attemps";
import { handleInputChange, handleKeyDown } from "@/app/utils/game";
import { sendToast } from "@/app/utils/toast";

export default function GameBoard({
  dicoUsed,
  secretWord,
  isRestAvaliable = false,
  handChageGameStatus,
  setIsOpen,
}) {
  const [isInvalidWord, setIsInvalidWord] = useState(false);
  const [allAttemps, setAllAttemps] = useState([]);
  const [inputs, setInputs] = useState(Array(secretWord.length).fill(""));
  const inputRefs = Array(secretWord.length)
    .fill(0)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    .map(() => useRef());

  useEffect(() => {
    if (inputs.every((input) => input !== " " && input !== "")) {
      const wordsAttemp = inputs.join("");
      if (!dicoUsed.includes(wordsAttemp.toLowerCase())) {
        setIsInvalidWord(true);
        sendToast({
          type: "error",
          message: "Le mot n'existe pas",
          duration: 2000,
        });
        return;
      }

      const isAlreadyUsed = allAttemps.some(
        (attempt) => attempt.join("") === wordsAttemp.toLocaleUpperCase()
      );
      if (isAlreadyUsed) {
        sendToast({
          type: "error",
          message: "Vous avez déjà essayé ce mot",
          duration: 2000,
        });
        setInputs(Array(secretWord.length).fill(""));
        return;
      }

      setAllAttemps((prevAllAttemps) => [...prevAllAttemps, [...inputs]]);
      setInputs(Array(secretWord.length).fill(""));

      const isCorrect = inputs.every(
        (input, index) => input === secretWord[index]
      );

      if (isCorrect || allAttemps.length + 1 === secretWord.length) {
        const result = isCorrect ? "won" : "lose";
        handChageGameStatus(result);
        setIsOpen(true);
        setInputs(Array(secretWord.length).fill(""));
        if (isRestAvaliable) {
          setAllAttemps([]);
        }
      } else {
        inputRefs[0].current.focus();
      }
    }
  }, [inputs]);

  return (
    <>
      <div className="flex flex-col items-center pt-[10vh]">
        <PreviousAttempts allAttemps={allAttemps} secretWord={secretWord} />
        <div className="max-md:space-x-[2px] space-x-2 flex mt-2">
          {inputs.map((input, index) => (
            <input
              key={index}
              type="text"
              className={`max-md:w-12 max-md:h-12 w-14 h-14 flex text-center rounded-lg shadow-card bg-white`}
              style={{ fontFamily: "Oswald" }}
              minLength={1}
              maxLength={1}
              value={input}
              onChange={(e) =>
                handleInputChange(
                  index,
                  e.target.value,
                  inputRefs,
                  inputs,
                  setInputs,
                  setIsInvalidWord
                )
              }
              onKeyDown={(e) => handleKeyDown(index, e, inputRefs, inputs)}
              ref={inputRefs[index]}
            />
          ))}
        </div>
        {secretWord.length - allAttemps.length - 1 > 0 && (
          <RemainingAttempts
            remainingAttempts={secretWord.length - allAttemps.length - 1}
            wordLength={secretWord.length}
          />
        )}

        {isInvalidWord && (
          <span className="text-red-400 font-bold bg-white p-4 rounded-lg mt-4">
            Le mot saisie n&apos;existe pas dans le dictionnaire
          </span>
        )}
      </div>
    </>
  );
}
