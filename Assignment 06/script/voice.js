function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; 
    window.speechSynthesis.speak(utterance);
  }