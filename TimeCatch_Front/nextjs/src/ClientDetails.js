import React, { useState, useEffect } from "react";
import { backEndHost } from './config';

const secondsToHm = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    
    return hDisplay + mDisplay; 
}

export default function Index({id}) {

    const [clientData, setClientData] = useState({}); 
    const [errors, setErrors] = useState(''); 

    const fetchData = async () => {
        const res = await fetch(backEndHost + "/api/clients/" + id);
        res
        .json()
        .then(res => setClientData(res))
        .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2 id="simple-modal-title">{clientData.clientName}</h2>
            <p id="simple-modal-description">
                Time Spent: {clientData.totalTimeSpent > 0 ? secondsToHm(clientData.totalTimeSpent) : 'none'} 
            </p>
        </div>
    );
}