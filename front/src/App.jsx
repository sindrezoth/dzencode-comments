import { useContext } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import AuthContext from "./context/AuthContext";

function App() {
  const {isLoading} = useContext(AuthContext);
  return (
    
    !isLoading ? <>

      <Header />
      <Main />
    </>
    : <p>Спроба авторизації...</p>
  
  );
}

export default App;
