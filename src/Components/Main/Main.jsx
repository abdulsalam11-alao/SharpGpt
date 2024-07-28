import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { context } from "../../context/Context";

function Main() {
  const {
    onSent,
    recentPromt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(context);
  return (
    <div className="main">
      <div className="nav">
        <p>Sharp Gpt</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            {" "}
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can i help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>{" "}
              <div className="card">
                <p>Briefly Summarize this concept : urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>{" "}
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>{" "}
              <div className="card">
                <p>Improve the readability of our following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="recent-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPromt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img src={assets.send_icon} onClick={() => onSent()} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Sharp Gpt may display inaccurate info including about people so
            double-check its reponse. Your Privacy and Sharp Gpt App
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
