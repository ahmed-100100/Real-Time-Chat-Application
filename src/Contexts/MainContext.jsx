import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { POST } from "../api/axios";
export let MainContext = createContext("");
export function MainContextProvider({ children }) {
  let [logged, setLogged] = useState(false);
  let [loading, setLoading] = useState(false);
  let [loggedUser, setLoggedUser] = useState({});
  let [currentChatID, setCurrentChatID] = useState("");
  let [friendsInfo, setfriendsInfo] = useState([]);
  const [chatList, setChatList] = useState([]);
  let [allMessage, setAllMessage] = useState({});
  console.log(allMessage);
  // const checkLogin = () => {
  //   setLoading(true);
  //   GET("/api/users/profile")
  //     .then((response) => {
  //       if (response.data.success) {
  //         setLoggedUser(response.data.data);
  //         setLogged(true);
  //       }
  //     })
  //     .catch(() => {
  //       setLoggedUser({});
  //       setLogged(false);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   checkLogin();
  // }, [logged]);

  function logOut() {
    POST("/api/users/logout", {}).finally(() => {
      setLoggedUser({});
      setLogged(false);
    });
  }
  return (
    <MainContext.Provider
      value={{
        logged,
        loggedUser,
        setLoggedUser,
        setLoading,
        loading,
        setLogged,
        logOut,
        chatList,
        setChatList,
        currentChatID,
        setCurrentChatID,
        allMessage,
        setAllMessage,
        friendsInfo,
        setfriendsInfo,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
MainContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
