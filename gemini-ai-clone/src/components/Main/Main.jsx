import React, { useContext, useState, useEffect, useRef } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = ({ updateRecentPrompts }) => {
  const { onSent, response, isLoading, clearResponse } = useContext(Context);
  const [input, setInput] = useState('');
  const [recentPrompts, setRecentPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [typedResponse, setTypedResponse] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const resultRef = useRef(null);

  useEffect(() => {
    if (response && !isLoading) {
      setTypingIndex(0);
      setTypedResponse('');
    }
  }, [response, isLoading]);

  useEffect(() => {
    if (response && typingIndex < response.length && !isLoading) {
      const timeout = setTimeout(() => {
        setTypedResponse((prev) => prev + response[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [response, typingIndex, isLoading]);

  useEffect(() => {
    resultRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [typedResponse]);

  const handleCardClick = (prompt) => {
    setInput(prompt);
    handleSent(prompt);
  };

  const handleSent = async (prompt) => {
    if (prompt) {
      const newPrompt = prompt;
      setRecentPrompts((prev) => [newPrompt, ...prev.slice(0, 4)]);
      updateRecentPrompts((prev) => [newPrompt, ...prev.slice(0, 4)]);
      setShowResult(true);
      await onSent(prompt);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSent(input);
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              {[
                'Suggest beautiful places to see on an upcoming road trip',
                'Briefly summarize this concept: urban planning',
                'Brainstorm team bonding activities for our work retreat',
                'Tell me about React js and React native',
              ].map((prompt, index) => (
                <div key={index} className="card" onClick={() => handleCardClick(prompt)}>
                  <p>{prompt}</p>
                  <img src={Object.values(assets)[index + 2]} alt="" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result" ref={resultRef}>
            <div className="result-title">
              <img src={assets.user_icon} alt="user" />
              <p>{recentPrompts[0]}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini" />
              {isLoading ? (
                <div className="loader"><hr /><hr /><hr /></div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: typedResponse }}></p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="main-bottom">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter a prompt here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div>
            <img src={assets.gallery_icon} alt="gallery" />
            <img src={assets.mic_icon} alt="microphone" />
            {input && <img src={assets.send_icon} alt="send" onClick={() => handleSent(input)} />}
          </div>
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
        </p>
      </div>
    </div>
  );
};

export default Main;
