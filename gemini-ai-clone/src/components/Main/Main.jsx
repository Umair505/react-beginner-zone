import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
  const { onSent, response, isLoading, clearResponse } = useContext(Context)
  const [input, setInput] = useState('')
  const [recentPrompts, setRecentPrompts] = useState([])
  const [showResult, setShowResult] = useState(false)

  const handleCardClick = (prompt) => {
    setInput(prompt)
    handleSent(prompt)
  }

  const handleSent = async (prompt) => {
    if (prompt) {
      setRecentPrompts(prev => [prompt, ...prev])
      setShowResult(true)
      await onSent(prompt)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSent(input)
    }
  }

  return (
    <div className='main'>
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
                "Suggest beautiful places to see on an upcoming road trip",
                "Briefly summarize this concept: urban planning",
                "Brainstorm team bonding activities for our work retreat",
                "Tell me about React js and React native"
              ].map((prompt, index) => (
                <div 
                  key={index} 
                  className="card" 
                  onClick={() => handleCardClick(prompt)}
                >
                  <p>{prompt}</p>
                  <img src={Object.values(assets)[index + 2]} alt="" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user" />
              <p>{recentPrompts[0]}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini" />
              {isLoading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{__html: response}}></p>
              )}
            </div>
          </div>
        )}
        
        <div className="main-bottom">
          <div className="search-box">
            <input 
              type="text" 
              placeholder='Enter a prompt here'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="microphone" />
              {input ? (
                <img 
                  src={assets.send_icon} 
                  alt="send" 
                  onClick={() => handleSent(input)} 
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main