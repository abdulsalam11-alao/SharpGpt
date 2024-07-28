// src/Components/Main/TextToSpeech.jsx
import React, { useEffect, useState } from "react";

const TextToSpeech = ({ text }) => {
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const getVoices = () => {
      const voicesList = synth.getVoices();
      if (voicesList.length > 0) {
        setVoices(voicesList);
      } else {
        setTimeout(getVoices, 100); // Retry until voices are loaded
      }
    };

    getVoices();

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = getVoices;
    }

    return () => {
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = null;
      }
    };
  }, []);

  const stripHTML = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const speak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      setIsSpeaking(false);
    } else {
      const cleanText = stripHTML(text);
      if (cleanText.trim() === "") {
        return;
      }
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const selectedVoice =
        voices.find((voice) => voice.lang === "en-US") || voices[0];
      utterance.voice = selectedVoice;

      utterance.onend = () => {
        setIsSpeaking(false); // Reset speaking state when finished
      };

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <button onClick={speak} aria-label="Speak" className="speaker">
      {isSpeaking ? "🔇" : "🔊"}
    </button>
  );
};

export default TextToSpeech;
