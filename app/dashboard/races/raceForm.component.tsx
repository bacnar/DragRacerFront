"use client";

import React from 'react';
import * as signalR from "@microsoft/signalr";
import Grid from '@mui/material/Grid';
import { toast } from "react-toastify";
import configData from "../../../app.config.json";
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Session from '../types/Session';
import { Typography } from '@mui/material';
import TimingBox from '@/components/timingBox.component';

enum RaceStatus {
  wait,
  ready,
  inProgress,
  finnished,
  error
}

function ParseStatus(status: RaceStatus): string {
  switch (status) {
    case RaceStatus.wait: return "Wait for connection"
    case RaceStatus.ready: return "Ready to start the race"
    case RaceStatus.inProgress: return "Race in progress"
    case RaceStatus.finnished: return "Race ended"
    case RaceStatus.error: return "Cannot start race"
    default: throw "Cannot be here"
  }
}

function ParseStartingStatus(status: string): RaceStatus {
  switch (status) {
    case "NotStarted": return RaceStatus.wait
    case "Started": return RaceStatus.inProgress
    case "Ended": return RaceStatus.finnished
    default: throw "Cannot be here"
  }
}

export default function RaceForm(props: {session: Session}) {
  const racer1 = props.session.races?.at(0)?.user!
  const racer2 = props.session.races?.at(1)?.user

  const [raceStatus, setRaceStatus] = React.useState<RaceStatus>(ParseStartingStatus(props.session.statusNamed));
  const router = useRouter();

  const connection = new signalR.HubConnectionBuilder()
  .withUrl( configData.WS_URL )
  .build();

  connection.on("raceStarted", () => {
    setRaceStatus(RaceStatus.inProgress);
  });

  connection.on("raceEnded", () => {
    setRaceStatus(RaceStatus.finnished);
    router.refresh();
  });

  connection.start()
    .then(() => { if(raceStatus == RaceStatus.wait) setRaceStatus(RaceStatus.ready)})
    .catch((ex) => {
      console.error(ex)
      toast('Error connecting to server', { hideProgressBar: true, autoClose: 2000, type: 'error' })
      setRaceStatus(RaceStatus.error);
  });

  const stopAndInsert = async () => {
    try {
      const response = await fetch(configData.API_URL + "Sessions/stop", {cache: "no-store", method: 'GET'})
      if (response.status === 200) {
        toast('Race ended', { hideProgressBar: true, autoClose: 2000, type: 'success' })
      } else {
        console.error("Error ending race, error:", await response.text());
        toast('Error ending race', { hideProgressBar: true, autoClose: 2000, type: 'error' })
      }
    } catch (ex) {
      console.error(ex)
      toast('Error ending race', { hideProgressBar: true, autoClose: 2000, type: 'error' })
    }
  }

  return (
    <React.Fragment>
        <Typography variant='h5' className='text-center mb-4'>
          {ParseStatus(raceStatus)}
        </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} textAlign='center'>
          <TimingBox trackId={0} racer={racer1} time={props.session.races?.at(0)?.result} />
        </Grid>
        <Grid item xs={6} md={2} textAlign='center'>
          <Button disabled={!(raceStatus == RaceStatus.inProgress || raceStatus == RaceStatus.ready)} onClick={stopAndInsert} color='error' variant="outlined">Stop and insert result</Button>
        </Grid>
        <Grid item xs={12} md={5} textAlign='center'>
          {racer2 != undefined && (
            <TimingBox trackId={1} racer={racer2} time={props.session.races?.at(1)?.result} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}