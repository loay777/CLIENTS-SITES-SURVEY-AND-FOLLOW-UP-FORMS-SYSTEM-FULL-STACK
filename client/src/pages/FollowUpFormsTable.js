import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MainPage.css";
import {Link, useNavigate } from 'react-router-dom';
import * as ReactBootStart from 'react-bootstrap';


export default function FollowUpFormsTable() {
    let navigate = useNavigate();
    const [formsList, setFormsList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/api/getfollowupforms",).then((data) => {
            console.log(data);
            setFormsList(data.data)
        })
    }, []);

    async function  fetchForm(formID) {
      
        console.log("Trying to fetch form data for from ID: " + formID);
             const fetch = await axios.get(`http://localhost:3001/api/getfollowupformsbyid/${formID}`).then((data) => {
                console.log(data.data[0]);
                navigate(`/followupfrom/${formID}`,{ state: data.data[0]})

                // const attached =  Axios.get(`http://localhost:3001/api/getattachment/${data.data[0].cr_number}`).then((res) => {
                //     res.data.forEach((item) => { console.log(item) });
                //     // setAttachments("/attachments/"+res.data[0].url);
                //     res.data.forEach((item) => { setAttachments((attachments) => [...attachments, "/attachments/" + item.url]) });
    
                //     // console.log(res.data[0].url);
                //     //get the list of attachment URLs here and fetch from file 
                // })
                // setIsLoading(false);
               
    
            });
            
           
    }

    const [previousData, setPreviousData] = useState({})
    return (
        <div className="MainPage">
           {formsList.length===0?<div className="centerLoading"><ReactBootStart.Spinner animation="border"/></div>: <table>
                <thead>
                    <tr>
                        <th>Request Number</th>
                        <th>Request Date </th>
                        <th>Request Type</th>
                        <th>CR Number</th>
                    </tr>
                </thead>
                <tbody>
                    {formsList.map((val, key) => {
                        console.log(val.id );
                        return (
                            <tr key={key} onClick={() =>{fetchForm(val.id)}}>
                                <td><strong>{val.request_number}</strong></td>
                                <td>{val.date}</td>
                                <td>{val.request_type}</td>
                                <td>{val.cr_number}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>}
        </div>
    )
}

