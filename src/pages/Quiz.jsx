import React, { useEffect, useState } from 'react';
import questionsData from "../data/data.json";
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";

const Quiz = () => {
  const [questions] = useState(questionsData.data.questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate(); // Initialize navigate hook
  const [results, setResults] = useState([]);


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentQuestion = questions[currentIndex];
  const sentenceParts = currentQuestion.question.split("_____________");
  const blanksCount = sentenceParts.length - 1;

  const handleWordClick = (word) => {
    if (selectedWords.length < blanksCount) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleUnselectWord = (word) => {
    setSelectedWords(selectedWords.filter(w => w !== word));
  };
  const handleNext = () => {
    const sentenceParts = currentQuestion.question.split("_____________");
    const correctAnswer = currentQuestion.answer;
    
    const resultEntry = {
      question: currentQuestion.question,
      correctAnswer,
      userAnswer: selectedWords.join(" "), 
      selectedWords,
      sentenceParts,
      isCorrect: selectedWords.join(" ") === correctAnswer,
    };
  
    const storedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];

    storedAnswers.push(resultEntry);
    localStorage.setItem('userAnswers', JSON.stringify(storedAnswers));
  
    const updatedResults = [...results, resultEntry];
  
    if (currentIndex < questions.length - 1) {
      setResults(updatedResults);
      setCurrentIndex(currentIndex + 1);
      setSelectedWords([]);
      setTimer(30);
    } else {
      navigate('/feedback', { state: updatedResults });
    }
  };
  const handleQuit = () => {
    localStorage.clear();
    navigate('/'); 
  };

  
  const availableOptions = currentQuestion.options.filter(option => !selectedWords.includes(option));

  return (
    <div className="pt-20 px-4 flex flex-col items-center text-center min-h-screen justify-start relative">
      
   
      <div className="fixed top-0 left-0 right-0 bg-white z-50 p-4 flex justify-between items-center max-w-5xl mx-auto w-full text-lg">
        <span>0:{timer}</span>
        <button 
          className="p-4 bg w-[76px] h-[44px] flex items-center rounded-[8px] mt-2 border-[1px]" 
          onClick={handleQuit}
        >
          Quit
        </button>
      </div>
      
      <div className="w-full flex justify-center py-4 mb-8 mt-2">
        <ul className="flex gap-4">
          {questions.map((_, index) => (
            <li
              key={index}
              className={`h-2 w-[82px] rounded-sm ${index <= currentIndex ? "bg-yellow-400" : "bg-gray-300"}`}
            ></li>
          ))}
        </ul>
      </div>
      

      <div className="w-full max-w-5xl text-[20px] font-[600] leading-[22px] my-[50px]">
        <p>Select the missing words in the correct order</p>
      </div>
      
      <div className="text-xl gap-[20px] w-full max-w-5xl font-semibold mb-4 flex flex-wrap justify-center">
        {sentenceParts.map((part, i) => (
          <React.Fragment key={i}>
            <span>{part}</span>
            {i < blanksCount && (
              selectedWords[i] ? (
                <span
                  onClick={() => handleUnselectWord(selectedWords[i])}
                  className="mx-2 bg-blue-100 px-2 py-1 rounded cursor-pointer"
                >
                  {selectedWords[i]}
                </span>
              ) : (
                <span className="mx-2 px-4 py-1 border-b border-black text-transparent select-none">
                  placeholder
                </span>
              )
            )}
          </React.Fragment>
        ))}
      </div>
      
     
      <div className="flex gap-3 flex-wrap justify-center mb-6">
        {availableOptions.map((word, i) => (
          <button
            key={i}
            onClick={() => handleWordClick(word)}
            className="border px-4 py-2 rounded hover:bg-gray-200"
          >
            {word}
          </button>
        ))}
      </div>

    
      <div className="absolute bottom-4 right-4 flex justify-end w-full px-4">
        {selectedWords.length === blanksCount && (
          <button
            onClick={handleNext}
            className="bg-[#453FE1] text-white px-6 py-4 rounded-[8px]"
          >
            <FaLongArrowAltRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
