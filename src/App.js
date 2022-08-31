import React from "react";
import "./App.css";
import Header from "./components/header";
import Router from "./router";
import Footer from "./components/footer";
import { BrowserRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Router />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
