import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreateRecord from "./pages/CreateRecord";
import FollowUpForm from "./pages/FollowUpForm";
import VisitForm from "./pages/VisitForm";
import DisplayFollowUPFrom from "./pages/DisplayFollowUpForm";


function App() {
  return <>
    <div className="navbar">
      <div className="links">
        <a href="/">Main Page</a>
        <a href="/createrecord">Create Record</a>
        <a href="/createfollowupform">Create Follow Up Form</a>
        <a href="/createvisitform">Create Visit Form</a>
        
      </div>
    </div>

    <Router>
      <Routes>
        <Route path="/" exact element={<MainPage/>}/>
        <Route path="/createrecord" exact element={<CreateRecord/>} />
        <Route path="/createfollowupform" exact element={<FollowUpForm/>} />
        <Route path="/createvisitform" exact element={<VisitForm/>} />
        <Route path="/followupfrom/:followupfromId" exact element={<DisplayFollowUPFrom/>} />
      </Routes>
    </Router>
  </>

}

export default App;