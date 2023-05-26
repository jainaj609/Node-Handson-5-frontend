
// import { BrowserRouter } from "react-router-dom";
import "./App.css"


// import Navigation from "./Components/Navigation";
import AppFile from "./Components/AppFile";



import logo from './logo.svg';
import './App.css';


function App() {

 
  return (
    <div className="App">

      {/* <BrowserRouter>
        <Navigation />
      </BrowserRouter> */}
      <AppFile/>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;