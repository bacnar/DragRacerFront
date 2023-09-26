"use client"

import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../../components/title.component';
import Paper from '@mui/material/Paper';
import Session from '../types/Session';
import RaceTableRow from './raceTableRow.component';
import RaceForm from './raceForm.component';
import Button from '@mui/material/Button';
import configData from "../../../app.config.json";
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';


export default function RacePageWrapper(props: {sessions: Array<Session>}) {  
  const [sessionInProgress, setSessionInProgress] = React.useState<Session | undefined>(undefined);
  const [interactable, setInteractable] = React.useState<boolean>(true);
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const router = useRouter();

  const resetSession = async () => {
    try {
      const response = await fetch(configData.API_URL + "Sessions/reset", {cache: "no-store", method: 'GET'})
      if (response.status === 200) {
        toast('Session reseted', { hideProgressBar: true, autoClose: 2000, type: 'success' })
        setSessionInProgress(undefined);
        setInteractable(true);
        router.refresh();
      } else {
        console.error("Error reseting, error:", await response.text());
        toast('Error reseting', { hideProgressBar: true, autoClose: 2000, type: 'error' })
      }
    } catch (ex) {
      console.error(ex)
      toast('Error reseting', { hideProgressBar: true, autoClose: 2000, type: 'error' })
    }
  }

  useEffect(() => {
    const fetchInProgress = async () => {
      try {
        const response = await fetch(configData.API_URL + "Sessions/inProgress", {cache: "no-store", method: 'GET'})
        if (response.status === 200) {
          const content = await response.json() as Session
          console.log(content)
          if (content != null) {
            setInteractable(false);
            setSessionInProgress(content);  
          }
        } else if (response.status !== 204) {
          console.error("Error getting race in progress, error:", await response.text());
          toast('Error getting race in progress', { hideProgressBar: true, autoClose: 2000, type: 'error' })
        }
      } catch (ex) {
        console.error(ex)
        toast('Error getting race in progress', { hideProgressBar: true, autoClose: 2000, type: 'error' })
      }
      finally {
        setLoading(false);
      }
    }

    fetchInProgress()
  }, [])
  if (isLoading) return <p>Loading...</p>

  return <React.Fragment>
    <Paper sx={{ p: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Title>Race in progress</Title>
      </Grid>
      <Grid item xs={6}>
        <Button onClick={resetSession} variant="outlined" color='error' className='float-right'>Force reset</Button>
      </Grid>
    </Grid>
    {sessionInProgress != undefined && (
      <RaceForm session={sessionInProgress} />
    )}
    </Paper>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Sessions</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Racer 1</TableCell>
            <TableCell>Racer 2</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.sessions.map((row: Session) => (
            <RaceTableRow key={row.id} row={row} setSessionInProgress={setSessionInProgress} setInteractable={setInteractable} interactable={interactable} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  </React.Fragment>
}