import { useState, useContext, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import AuthContext from "./context/AuthContext";

function App() {
  const [count, setCount] = useState(0);
  const { authed, setAuthed } = useContext(AuthContext);

  useEffect(() => {
    console.log(authed);
  }, [authed]);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
