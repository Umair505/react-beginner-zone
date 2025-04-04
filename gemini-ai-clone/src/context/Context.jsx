import { createContext, useState } from "react";
import run from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = (props) => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSent = async (prompt) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await run(prompt);
      setResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const contextValue = {
    onSent,
    response,
    isLoading,
    error,
    clearResponse: () => setResponse(""),
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;