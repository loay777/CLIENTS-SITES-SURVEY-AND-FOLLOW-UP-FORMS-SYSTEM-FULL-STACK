import React, { useEffect, useState } from "react";
import "./CreateRecord.css";
import Axios from "axios";

export default function CreateRecord() {

    const [title, setTitle] = useState("")
    const [clientName, setClientName] = useState("")
    const [location, setLocation] = useState("")
    const [timeDate, setTimeDate] = useState("")
    const [notes, setNotes] = useState("")

    // useEffect(() => {
    //     console.log("Title: " + title +
    //      "\nClient Name: " + clientName +
    //       "\nLocation: " + location +
    //        "\nDate&Time: " + timeDate +
    //         "\nNotes: " + notes)
    // }, [title, clientName, location, timeDate, notes])

    const submitRecord = () => {
        Axios.post('http://localhost:3001/api/create', {
            title: title,
            clientName: clientName,
            location: location,
            timeDate: timeDate,
            notes: notes,
        });
    };

    return (
        <div className="recordPage">
            <div className="recordForm">
                <label>Visit Title</label>
                <input type="text" onChange={(e) => { setTitle(e.target.value); }} />
                <label>Client Name</label>
                <input type="text" onChange={(e) => { setClientName(e.target.value); }} />
                <label>Location</label>
                <input type="text" onChange={(e) => { setLocation(e.target.value); }} />
                <label>Time and Date</label>
                <input type="datetime-local" onChange={(e) => { setTimeDate(e.target.value); }}></input>
                <label>Visit Notes</label>
                <textarea onChange={(e) => { setNotes(e.target.value); }} />
                <button onClick={submitRecord}>Save</button>
            </div>
        </div>
    )
}