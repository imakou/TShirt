import React, { Component } from "react";
import "./App.css";
import DesignBar from "./Components/DesignBar";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h4>3nk</h4>
            </div>
            <div className="col-md-4">
              <DesignBar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
