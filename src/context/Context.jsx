// ContextProvider.jsx
import React, { createContext, useState } from "react";
import run from "../config/SharpGpt";

export const context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPromt, setRecentPromt] = useState("");
  const [prevPromt, setPrevPromt] = useState([]);
  const [showResult, setShowResults] = useState(false);
  const [resultData, setResultData] = useState("");
  const [loading, setLoading] = useState(false);

  const delayPara = (index, next) => {
    setTimeout(() => {
      setResultData((prev) => prev + next);
    }, 75 * 3 * index); // Adjusted to multiply by index to ensure sequential update
  };

  const newChat = () => {
    setLoading(false);
    setShowResults(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResults(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPromt(prompt);
    } else {
      setPrevPromt((prev) => [...prev, input]);
      setRecentPromt(input);
      response = await run(input);
    }
    let responseArray = response.split("");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        // Changed condition to "i % 2 !== 1"
        newResponse += responseArray[i];
      } else {
        newResponse += responseArray[i];
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPromt,
    setPrevPromt,
    onSent,
    setRecentPromt,
    recentPromt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };
  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export default ContextProvider;
