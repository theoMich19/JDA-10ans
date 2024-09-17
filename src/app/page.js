"use client";

import ModalGame from "./components/modal/modal";
import GameBoard from "./components/game/game-board";
import { dico } from "../data/dico";
import { useState } from "react";
import { numberToWord } from "./utils/transform";

export default function Home() {
  const [gameStatus, setGameStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const secretWord = "DANSEUR";
  const valueindex = numberToWord(secretWord.length);
  const listWords = dico;
  const dicoUsed = listWords[valueindex];

  const handChageGameStatus = async (status) => {
    setGameStatus(status);
  };

  const errorSecretWord = !secretWord
    ? "Une erreur est survenue, revenez plus tard !"
    : "";
  const status = !gameStatus && secretWord;

  return (
    <div className="h-[100vh] w-[100vw] overflow-x-hidden ">
      <a
        href="https://www.jeunesdanseursavignonnais.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="w-full bg-no-repeat bg-top bg-cover z-10 cursor-pointer h-[200px]"
          style={{
            backgroundImage: "url('images/couverture.png')",
          }}
        ></div>
      </a>
      <div className="w-full h-full bg-black bg-cover">
        <div className="flex flex-col h-full items-center ">
          {isOpen && (
            <ModalGame
              setIsOpen={setIsOpen}
              gameStatus={gameStatus}
              secretWord={secretWord}
            />
          )}
          {status ? (
            <GameBoard
              dicoUsed={dicoUsed}
              secretWord={secretWord}
              handChageGameStatus={handChageGameStatus}
              setIsOpen={setIsOpen}
              isRestAvaliable={false}
            />
          ) : (
            <div className="min-w-[300px] min-h-[300px] md:min-w-[400px] md:min-h-[400px] pt-[20vh]">
              <div className="w-full h-full p-8 backdrop-filter backdrop-blur-lg rounded-lg flex flex-col items-center justify-evenly text-white gap-4 md:text-base text-sm">
                <div className="flex flex-col">
                  {errorSecretWord ? (
                    <h1 className="text-lg md:text-2xl font-bold">
                      {errorSecretWord}
                    </h1>
                  ) : (
                    <>
                      <h1 className="text-lg md:text-2xl font-bold">
                        Le mot du jour a déjà été trouvé
                      </h1>
                      <span className="text-lg text-center p-2">
                        Le mot caché était :{" "}
                      </span>
                      <span className="px-4 py-2 border-2 border-gray-600 border-dashed  w-fit items-center rounded-lg self-center">
                        {secretWord}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
