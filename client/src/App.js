import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import VisitFormsTable from "./pages/VisitFormsTable";
import FollowUpForm from "./pages/FollowUpForm";
import VisitForm from "./pages/VisitForm";
import DisplayFollowUPFrom from "./pages/DisplayFollowUpForm";
import DisplayVisitForm from "./pages/DisplayVisitForm";
import AllDataTable from "./pages/AllDataTable";
import * as ReactBootStart from 'react-bootstrap';
import FollowUpFormsTable from './pages/FollowUpFormsTable';
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
    {/* <div className="navbar">
      <div className="links">

        <a href="/createrecord">Vist Forms</a>
        <a href="/">Follow Up Forms</a>
        <a href="/createfollowupform">Create Follow Up Form</a>
        <a href="/createvisitform">Create Visit Form</a>
        <a href="/alldata">All records</a>
      </div>
    </div> */}
    <ReactBootStart.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
 
      <ReactBootStart.Container>
        <ReactBootStart.Navbar.Brand href="/">Moayed's Forms keeper</ReactBootStart.Navbar.Brand>
       <ReactBootStart.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBootStart.Navbar.Collapse id="basic-navbar-nav">
          <ReactBootStart.Nav className="me-auto">
            {/* <ReactBootStart.Nav.Link href="/">Home</ReactBootStart.Nav.Link> */}
            <ReactBootStart.Nav.Link href="/followupformstable">Follow Up Forms</ReactBootStart.Nav.Link>
            <ReactBootStart.Nav.Link href="/visitformstable">Visit Forms</ReactBootStart.Nav.Link>
            <ReactBootStart.NavDropdown title="Create" id="basic-nav-dropdown">
              <ReactBootStart.NavDropdown.Item href="/createfollowupform">New Follow Up Form</ReactBootStart.NavDropdown.Item>
              <ReactBootStart.NavDropdown.Divider />
              <ReactBootStart.NavDropdown.Item href="/createvisitform">New Visit Form</ReactBootStart.NavDropdown.Item>
            </ReactBootStart.NavDropdown>
          </ReactBootStart.Nav>
        </ReactBootStart.Navbar.Collapse>
      </ReactBootStart.Container>
    </ReactBootStart.Navbar>

    <Router>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/visitformstable" exact element={<VisitFormsTable />} />
        <Route path="/createfollowupform" exact element={<FollowUpForm />} />
        <Route path="/createvisitform" exact element={<VisitForm />} />
        <Route path="/followupfrom/:followupfromId" exact element={<DisplayFollowUPFrom />} />
        <Route path="/visitform/:visitformId" exact element={<DisplayVisitForm />} />
        <Route path="/alldata" exact element={<AllDataTable/>} />
        <Route path="/followupformstable" exact element={<FollowUpFormsTable/>} />
        

      </Routes>
    </Router>
  </>

}

export default App;