import { useState } from "react";
import AuthContext from "./contexts/AuthContext";
import Header from "./layout/Header/Header";
import Pages from "./pages/Pages";

import './App.css'
import Footer from "./layout/Footer/Footer";

function App() {
  const [loggedUser, setLoggedUser] = useState()

  console.log(document.cookie);

  return (
    <AuthContext.Provider value={{loggedUser, setLoggedUser}}>
      <div className='app'>
        <Header />

        <main className="container">
          <Pages />
        </main>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
