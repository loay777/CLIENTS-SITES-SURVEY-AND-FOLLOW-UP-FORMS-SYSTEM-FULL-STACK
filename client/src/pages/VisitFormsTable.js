import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MainPage.css";
import { Link, useNavigate } from 'react-router-dom';
import * as ReactBootStart from 'react-bootstrap';

export default function CreateRecord() {
    let navigate = useNavigate();
    const [formsList, setFormsList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/api/getvisitforms",).then((data) => {
            console.log(data);
            setFormsList(data.data)
        })
    }, []);

    async function search(input) {

        if (input != "") {
            const getSearchResult = await axios.get(`http://localhost:3001/api/searchvisitforms/${input}`).then((data) => {
                console.log(data.data);
                setFormsList(data.data);
            })
        } else {
            axios.get("http://localhost:3001/api/getvisitforms",).then((data) => {
                console.log(data);
                setFormsList(data.data)
            })
        }

    }
    async function fetchForm(formID) {

        console.log("Trying to fetch form data for from ID: " + formID);
        const fetch = await axios.get(`http://localhost:3001/api/getvisitformbyid/${formID}`).then((data) => {
            console.log(data.data[0]);
            navigate(`/visitform/${formID}`, { state: data.data[0] })

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

    // const [previousData, setPreviousData] = useState({})
    return (
        <div className="MainPage">
            <input type="text" placeholder="Search" className="SearchFiled" onChange={(e) => {
                console.log(e.target.value)
                search(e.target.value)
            }}></input>
            {formsList.length === 0 ? <div className="centerLoading"><ReactBootStart.Spinner animation="border" /></div> : <table>
                <thead>
                    <tr>
                        <th>Form ID</th>
                        <th>City </th>
                        <th>Region</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {formsList.map((val, key) => {
                        console.log(val.id);
                        return (
                            <tr key={key} onClick={() => { fetchForm(val.id) }}>
                                <td><strong>{val.id}</strong></td>
                                <td>{val.city}</td>
                                <td>{val.region}</td>
                                <td>{val.notes}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>}
        </div>
    )
}
