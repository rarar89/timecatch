import React, { useEffect, useState } from "react";
import { backEndHost } from '../../src/config.js';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from 'next/link'
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import ClientDetails from '../../src/ClientDetails';
import AddNew from '../../src/AddNew';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {

    return ({
        modalWindow: {
            minHeight: '50%',
            maxWidth: 400,
            padding: '2em',
            margin: '2em auto',
            backgroundColor: '#fff'
        },
    });
});

export default function Index() {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [activeClient, setActiveClient] = useState(0);
    const [clients, setClients] = useState([]);

    const fetchData = async () => {
        const res = await fetch(backEndHost + "/api/clients");
        res
        .json()
        .then(res => setClients(res))
        .catch(err => setErrors(err));
    }

    const handleOpen = () => {
        
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const HandleClientClick = (id) => {
        setActiveClient(id);
        setOpen(true);
    }

    const afterAddedHandler = () => {
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, []);

    const modalBody = (<div className={classes.modalWindow}><ClientDetails id={activeClient} /></div>);

	return (
	  <Container maxWidth="sm">
		<Head>
		  <title>TimeCatch - Clients</title>
		</Head>
		<Box my={4}>
            <Paper>
                <Link href="/">
                    <Button variant="contained">Home</Button>
                </Link>
                <AddNew afterAddedHandler={afterAddedHandler} />
                <List>
                    {clients.map((client)=> 
                        <ListItem key={client.id}>
                            <ListItemText
                                primary={client.clientName} 
                            />
                            <ListItemSecondaryAction>
                                <IconButton  onClick={()=> HandleClientClick(client.id) } edge="end" aria-label="delete">
                                    details
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >   
                    {modalBody}
                </Modal>
            </Paper>
		</Box>
	  </Container>
	);
  }