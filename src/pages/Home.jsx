import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = ({ coins = 0 }) => {
  const navigate = useNavigate();
  coins = localStorage.getItem("finalScore");
  const handleStart = () => {
    localStorage.removeItem("finalScore");
    navigate("/quiz");
  };

  return (
    <main className="h-screen justify-center text-center flex flex-col">
      <Navbar />

      <div className="flex flex-col w-[400px] lg:w-[627px] h-[472px] m-auto items-center w-full">
        <img width={60} src="/edit.svg" alt="" />
        <div className="w-[627px] mt-[20px] h-[60px]">
          <h2 className="font-[600] lg:text-[40px] text-[25px] md:text-[30px]">
            Sentence Construction
          </h2>
        </div>
        <div>
          <p className="lg:text-[20px] text-[16px] font-[400] text-gray-400 lg:w-[627px] w-[500px] h-[56px]">
            Select the correct words to complete the sentence by arranging the
            provided options in the right order.
          </p>
        </div>
        <div className="flex justify-evenly mt-[90px] mb-[60px] lg:w-[627px] w-[500px]">
          <div className="space-y-4">
            <p>Time per Question</p>
            <p className="text-gray-400">30 sec</p>
          </div>
          <div className="space-y-4">
            <p>Total Questions</p>
            <p className="text-gray-400">10</p>
          </div>
          <div className="space-y-4 flex flex-col justify-center items-center">
            <p>Coins</p>
            <div className="flex items-center gap-2">
              <img src="/coin.svg" alt="" />
              <p>{+coins}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          <button className="border-1 w-[140px] rounded-[8px] py-[10px] px-[24px] text-[#453FE1] border-[#453FE1]">
            Back
          </button>
          <button
            className="border-1 w-[140px] rounded-[8px] py-[10px] px-[24px] text-white bg-[#453FE1]"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
