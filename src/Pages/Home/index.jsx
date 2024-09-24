import Navbar from "../../Components/Navbar";
import Chatbar from "../../Components/ChatBar";
import ChatRoom from "../../Components/ChatRoom";
import { useState } from "react";

export default function Home() {
  let [isActiveGrop, setisActiveGrop] = useState(false);
  let [isActiveUser, setisActiveUser] = useState(false);
  let [isActiveChat, setisActiveChat] = useState(true);
  return (
    <div className="row p-3 vh-100 justify-content-around">
      <Navbar
        setisActiveGrop={setisActiveGrop}
        setisActiveChat={setisActiveChat}
        setisActiveUser={setisActiveUser}
      />
      <Chatbar isActiveGrop={isActiveGrop} isActiveUser={isActiveUser} />
      <ChatRoom isActiveChat={isActiveChat} />
    </div>
  );
}
