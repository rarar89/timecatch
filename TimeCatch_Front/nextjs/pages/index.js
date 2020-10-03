import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from 'next/link'
import Head from 'next/head';
import { backEndHost } from '../src/config';
import TimeInput from '../src/TimeInput';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


export default function Index() {


  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Paper> 
            <Link href="/clients">
            <Button variant="contained">Clients</Button>
            </Link>
            <TimeInput />
        </Paper>
      </Box>
    </Container>
  );
}