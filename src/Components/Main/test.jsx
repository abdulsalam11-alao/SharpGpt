// src/Components/Main/TextToSpeech.jsx
import React, { useEffect, useState } from "react";

const TextToSpeech = ({ text }) => {
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const getVoices = () => {
      const voicesList = synth.getVoices();
      setVoices(voicesList);
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = getVoices;
    }
    getVoices(); // Initial load of voices
  }, []);

  const speak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices[0]; // Choose the first voice as default
      console.log(utterance.text);
      utterance.text = text;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false); // Reset speaking state when finished
      };
    }
  };

  return (
    <button onClick={speak} aria-label="Speak">
      {isSpeaking ? "🔇" : "🔊"}
    </button>
  );
};

export default TextToSpeech;
