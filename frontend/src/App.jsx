import Header from "./layout/Header/Header";
import Pages from "./pages/Pages";
import Footer from "./layout/Footer/Footer";
import {AuthContextProvider} from "./contexts/AuthContextProvider";

import './App.css'

function App() {
  return (
    <AuthContextProvider>
      <div className='app'>
        <Header />

        <main className="container">
          <Pages />
        </main>

        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
