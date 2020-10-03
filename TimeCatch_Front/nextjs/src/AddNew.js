import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {SUBMIT_SUCCESS, SUBMIT_IN_PROGRESS, SUBMIT_FAIL, NO_SUBMIT} from './formStates';
import React, { useState, useEffect } from "react";
import { backEndHost } from './config';
import Chip from '@material-ui/core/Chip';

export default function Index({afterAddedHandler}) {
    
    const [submitState, setSubmitState] = useState(NO_SUBMIT); 
    const [clientName, setName] = useState(""); 

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitState(SUBMIT_IN_PROGRESS);

        const res = await fetch(backEndHost + "/api/clients", {
            method: 'POST',
            credentials: "include",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode': 'cors',
            }, body: JSON.stringify({
                ClientName: clientName,
            }) 
        });

        res
        .json()
        .then(res => { 
            setName('');
            setSubmitState(SUBMIT_SUCCESS);

            if(typeof afterAddedHandler === 'function') {
                afterAddedHandler();
            }

            setTimeout(()=>{ setSubmitState(NO_SUBMIT); }, 2000);
        })
        .catch(err => setSubmitState(SUBMIT_FAIL));

        return false;
    }

    const handleNameChange = (ev) => {

        setName(ev.target.value);
    }

    return (
        <Box my={2}>
            <div>{(submitState === SUBMIT_SUCCESS ? 
                <Chip label="User Added" color="primary" /> 
                : submitState === SUBMIT_IN_PROGRESS ? <Chip label="Loading..." color="primary" /> : '')}
            </div>
            <TextField onChange={handleNameChange} value={clientName} id="standard-basic" label="Standard" />
            <Button onClick={handleSubmit} variant="contained">Add</Button>
        </Box>
    );
}