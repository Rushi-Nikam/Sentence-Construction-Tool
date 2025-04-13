import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../data/data.json";
import Circle from "../components/Circle";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Feedback = ({ isDarkMode = false }) => {
  const [score, setScore] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    setVisible((prev) => !prev);
  };

  const navigate = useNavigate();

  const questions = questionsData.data.questions;

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];

    const calculatedScore = storedAnswers.reduce((acc, result) => {
      const question = questions.find((q) => q.question === result.question);
      if (!question) return acc;

      const correctAnswer = question.correctAnswer.join(" ").trim();
      const userAnswer = result.userAnswer.trim();

      const correctWords = correctAnswer.split(" ");
      const userWords = userAnswer.split(" ");

      if (
        correctWords.length === userWords.length &&
        correctWords.every((word, index) => word === userWords[index])
      ) {
        return acc + 10;
      }
      return acc;
    }, 0);

    setScore(calculatedScore);
    localStorage.setItem("finalScore", calculatedScore); // Store final score
  }, []);

  const handleBackToHome = () => {
    localStorage.removeItem('userAnswers');
    navigate("/");
  };

  const getAqiValueFromScore = (score) => {
    return score;
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <header>
        <nav className="flex w-full items-center shadow-sm">
          <div className="flex ml-14 cursor-pointer" onClick={handleBackToHome}>
            <FaLongArrowAltLeft size={20} />
          </div>
          <ul className="w-full h-[64px] flex items-center justify-center">
            <li className="text-lg font-normal">Sentence Construction</li>
          </ul>
          <img className="flex w-[4px] mr-12" src="/dots.svg" alt="" />
        </nav>
      </header>

      <div className="pt-20 px-4 flex flex-col w-full items-center text-center">
        <div className="w-full max-w-3xl">
          <Circle
            aqiValue={getAqiValueFromScore(score)}
            maxAqi={100}
            isDarkMode={isDarkMode}
          />

          <div className="text-base mt-6 mb-12">
            While you correctly formed several sentences, there are a couple of
            areas where improvement is needed. Pay close attention to sentence
            structure and word placement to ensure clarity and correctness.
            Review your responses below for more details.
          </div>

          <button
            className="border-[1px] w-[250px] rounded-[8px] py-[10px] px-[24px] text-[#453FE1] border-[#453FE1] mb-8"
            onClick={handleVisibility}
          >
            Go to Dashboard
          </button>

          {visible && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <IoIosArrowDown size={40} />
              </div>
              {questions.map((question, idx) => {
                const storedAnswers =
                  JSON.parse(localStorage.getItem("userAnswers")) || [];
                const storedAnswer = storedAnswers[idx] || {};
                const userAnswer = storedAnswer.userAnswer || "";
                const correctWords = question.correctAnswer.join(" ");
                const sentenceParts = question.question.split("_____________");

                const isCorrect = userAnswer.trim() === correctWords;

                return (
                  <div
                    key={idx}
                    className="p-6 shadow-lg bg-[#FFFFFF] flex flex-col justify-center text-center mb-40 rounded"
                  >
                    <div className="flex items-center justify-between mb-4 w-full">
                      <p className="bg-gray-200 flex items-center justify-center rounded px-4 py-2 mt-2 w-[70px]">
                        Prompt
                      </p>
                      <p>
                        <span className="font-bold">{idx + 1}</span>/
                        <span className="text-gray-400">10</span>
                      </p>
                    </div>
                    <p className="mb-2 text-[16px] font-medium text-gray-800">
                      {question.question
                        .split("_____________")
                        .map((part, index) => (
                          <span key={index}>
                            {part}
                            {index < question.correctAnswer.length && (
                              <span className="mx-1">
                                {question.correctAnswer[index]}
                              </span>
                            )}
                          </span>
                        ))}
                    </p>

                    <div className="text-sm gap-2 ml-2 flex mt-10 mb-3">
                      Your response:{" "}
                      <span
                        className={
                          isCorrect ? "text-green-500" : "text-red-500"
                        }
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>
                    <div className="mt-2 font-normal text-[18px] leading-[28px] tracking-[-0.01em]">
                      {sentenceParts.map((part, i) => (
                        <span key={i} className="mt-2">
                          {part}
                          {i < sentenceParts.length - 1 && (
                            <span className="mx-1 px-2 rounded font-medium">
                              {userAnswer.split(" ")[i] || "____"}
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
