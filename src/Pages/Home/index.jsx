import { useContext } from "react";
import { MainContext } from "../../Contexts/MainContext";

export default function Home() {
  const { logOut } = useContext(MainContext);
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => logOut()}>Logout</button>
    </>
  );
}
