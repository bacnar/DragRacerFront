"use client";

import React from 'react';
import * as signalR from "@microsoft/signalr";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import User from '@/app/dashboard/types/User';
import { toast } from "react-toastify";
import configData from "../app.config.json";
import { ParseTimeToString } from '@/lib/helpers/parser.helper';

export default function TimingBox(props: {trackId: number, racer: User, time: number | undefined}) {
  const [time, setTime] = React.useState<number | undefined>(props.time);

  const connection = new signalR.HubConnectionBuilder()
    .withUrl( configData.WS_URL )
    .build();

  connection.on("timing", (trackId: number, time: number) => {
    console.log(time)
    if (trackId == props.trackId) {
      setTime(time)
    }
  });

  connection.start()
    .catch((ex) => {
      console.error(ex)
      toast('Error connecting to server', { hideProgressBar: true, autoClose: 2000, type: 'error' })
  });


  return (
    <React.Fragment>
      <Card sx={{ maxWidth: 345 }} className='m-auto'>
        <CardHeader
          title={props.racer.name + " - " + props.racer.car}
        />
        <CardContent>
          <Typography variant="h4">
            {ParseTimeToString(time)}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}