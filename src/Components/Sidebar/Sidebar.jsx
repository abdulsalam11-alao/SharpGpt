import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPromt, setRecentPromt, newChat } = useContext(context);
  const loadPromt = async (prompt) => {
    setRecentPromt(prompt);
    await onSent(prompt);
  };
  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt=""
          onClick={() => setExtended(!extended)}
        />
        <div className="new-chat" onClick={newChat}>
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPromt.map((item) => {
              return (
                <div
                  className="recent-entry"
                  onClick={() => loadPromt(item)}
                  key={item}
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="botton-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>help</p> : null}
        </div>
        <div className="botton-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="botton-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
