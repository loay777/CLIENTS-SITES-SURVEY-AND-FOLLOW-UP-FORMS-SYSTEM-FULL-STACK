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
import DisplayVisitForm from "./pages/DisplayVisitForm";
import AllDataTable from "./pages/AllDataTable";

function App() {
  return <>
  <style type="text/css">
    {`
      .navbar{
        width: 100%;
        height: 80px; 
        background-color: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      
      .navbar .links{
          font-size: 27px;
          color: rgb(92, 255, 43);
          /* font-family: 'Matrix', sans-serif; */
      
    `}
  </style>
    <div className="navbar">
      <div className="links">
        
        <a href="/createrecord">Vist Forms</a>
        <a href="/">Follow Up Forms</a>
        <a href="/createfollowupform">Create Follow Up Form</a>
        <a href="/createvisitform">Create Visit Form</a>
        <a href="/alldata">All records</a>
      </div>
    </div>

    <Router>
      <Routes>
        <Route path="/" exact element={<MainPage/>}/>
        <Route path="/createrecord" exact element={<CreateRecord/>} />
        <Route path="/createfollowupform" exact element={<FollowUpForm/>} />
        <Route path="/createvisitform" exact element={<VisitForm/>} />
        <Route path="/followupfrom/:followupfromId" exact element={<DisplayFollowUPFrom/>} />
        <Route path="/visitform/:visitformId" exact element={<DisplayVisitForm/>} />
        <Route path="/alldata" exact element={<AllDataTable/>} />

      </Routes>
    </Router>
  </>

}

export default App;