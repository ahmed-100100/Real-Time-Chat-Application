import { createContext, useState } from "react";
export let ChatContext = createContext("");
export function ChatContextProvider({ children }) {
  let [Allmessage, setAllmessage] = useState([]);

  const getMessage = () => {};
  return <ChatContext.Provider>{children}</ChatContext.Provider>;
}
