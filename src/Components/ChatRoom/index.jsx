import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideoCamera,
  faPhone,
  faPaperclip,
  faFaceSmile,
  faCamera,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import LogImg from "../../assets/images.png";
import "./style.css";
import ReceiverMessage from "./components/ReceiverMessage";

export default function ChatRoom() {
  function adjustTextareaHeight(event) {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
  return (
    <div className="col-md-7 col-9">
      <div className="d-flex w-100 justify-content-end ChatLive position-relative ">
        <div className="w-100 justify-content-between d-flex flex-column">
          <div className="d-flex justify-content-between bg-white p-3 h-auto rounded-top-4 position-relative line ">
            <div className="d-flex align-items-center  position-relative">
              <div className="ImgChatBox w-25 ">
                <img className=" rounded-circle w-50" src={LogImg} />
              </div>
              <div className="ps-2">
                <span className="ChatName">Brooo</span>
                <br></br>
                <span className="seen">Last seen 9:50 pm</span>
              </div>
            </div>

            <div className="d-flex align-items-center ChatLives">
              <a className="ps-3">
                <FontAwesomeIcon icon={faPhone} />
              </a>
              <a className="ps-3">
                <FontAwesomeIcon icon={faVideoCamera} />
              </a>
            </div>
          </div>

          <div className="h-100 bg-white flex-column p-3 align-items-end rounded-bottom-4 MessageBox position-relative">
            <ReceiverMessage />
            <div className="d-flex align-items-center position-absolute typing">
              <div className="input-container d-flex align-items-center rounded-3 w-100">
                <textarea
                  placeholder="Type your message here..."
                  rows="1"
                  className="message-input"
                  onInput={adjustTextareaHeight}
                />
                <FontAwesomeIcon icon={faPaperclip} />
                <FontAwesomeIcon icon={faFaceSmile} />
                <FontAwesomeIcon icon={faCamera} />
              </div>
              <div className="mic-icon d-flex align-items-center justify-content-center rounded-3">
                <FontAwesomeIcon icon={faMicrophone} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
