import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import { backEndHost } from './config';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TimePickers from './TimePickers';
import Chip from '@material-ui/core/Chip';
import {SUBMIT_SUCCESS, SUBMIT_FAIL, NO_SUBMIT, SUBMIT_IN_PROGRESS} from './formStates';

const useStyles = makeStyles((theme) => {

    return ({
        formControl: {
            minWidth: 220,
            padding: 5
        },
    });
});

export default function Index() {

    const classes = useStyles();

    const [hasError, setErrors] = useState(false);
    const [clients, setClients] = useState([]);
    const [submitState, setSubmitState] = useState(NO_SUBMIT); 

    const [selectedDateFrom, setSelectedDateFrom] = useState(new Date()); 
    const [selectedDateTo, setSelectedDateTo] = useState(new Date());
    const [selectClientId, setClientId] = useState('');

    const fetchData = async () => {
        const res = await fetch(backEndHost + "/api/clients");
        res
        .json()
        .then(res => setClients(res))
        .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDateChangeFrom = (date) => {
        setSelectedDateFrom(date);
    };

    const handleDateChangeTo = (date) => {
        setSelectedDateTo(date);
    };

    const handleChangeClient = (client) => {
        
        setClientId(client.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const res = await fetch(backEndHost + "/api/timeregistrations", {
            method: 'POST',
            credentials: "include",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode': 'cors',
            }, body: JSON.stringify({
                TimeFrom: selectedDateFrom,
                TimeTo: selectedDateTo,
                ClientId: selectClientId
            }) 
        });

        res
        .json()
        .then(res => { 
            
            setSubmitState(SUBMIT_SUCCESS);
            setTimeout(()=>{ setSubmitState(NO_SUBMIT); }, 2000);
        })
        .catch(err => setSubmitState(SUBMIT_FAIL));

        return false;
    }

	return (
	    <Container maxWidth="sm">
            <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                <Typography variant="h4" gutterBottom>
                    Add Time
                </Typography>
                {(submitState === SUBMIT_SUCCESS ? <Chip label="Time Added" color="primary" /> 
                : submitState === SUBMIT_IN_PROGRESS ? <Chip label="Loading..." color="primary" /> : '')}
                <TimePickers 
                    handleDateChangeFrom={handleDateChangeFrom}
                    handleDateChangeTo={handleDateChangeTo}
                    selectedDateFrom={selectedDateFrom}
                    selectedDateTo={selectedDateTo}
                />
                <Grid container direction="column" justify="center">
                    <FormControl className={classes.formControl}>
                        <InputLabel>Client:</InputLabel>
                            <Select
                                value={selectClientId}
                                onChange={handleChangeClient}
                            >
                            {clients.map((client)=> <MenuItem key={client.id} value={client.id}>{client.clientName}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <Button  type="submit" variant="contained">Save</Button>
                    </FormControl>
                </Grid>
            </form>
        </Container>
    );
}