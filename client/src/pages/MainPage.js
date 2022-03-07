import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MainPage.css";
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
    let navigate = useNavigate();
    const [formsList, setFormsList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/api/getfollowupforms",).then((data) => {
            console.log(data);
            setFormsList(data.data)
        })
    }, []);

    return (
        <div className="MainPage">
            <table>
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
                        console.log(val.id);
                        return (
                            <tr key={key} onClick={()=>navigate(`/followupfrom/${val.id}`)}>
                                
                                <td><strong>{val.request_number}</strong></td>
                                <td>{val.date}</td>
                                <td>{val.request_type}</td>
                                <td>{val.cr_number}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}