import Navbar from "../../Components/Navbar";
import Chatbar from "../../Components/ChatBar";
import ChatRoom from "../../Components/ChatRoom";

export default function Home() {
  return (
    <div className="row py-3 vh-100">
      <Navbar />
      <Chatbar /> 
      <ChatRoom />
    </div>
  );
}
