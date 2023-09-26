"use client"

import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditableTableCell from '../../../components/editableTableCell.component';
import Session from '../types/Session';
import IconButton from '@mui/material/IconButton';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import configData from "../../../app.config.json";
import { toast } from "react-toastify";

interface RaceTableRowProps {
  row: Session
  interactable: boolean
  setSessionInProgress: React.Dispatch<React.SetStateAction<Session | undefined>>
  setInteractable: React.Dispatch<React.SetStateAction<boolean>>
}

async function StartSession(id: number) {
  return fetch(configData.API_URL + "Sessions/start/" + id, { method: 'GET' })
}

export default function RaceTableRow(props: RaceTableRowProps) {
  const racer1 = props.row.races?.at(0)?.user!
  const racer2 = props.row.races?.at(1)?.user

  const startSession = async () => {
    try {
      props.setInteractable(false)
      const response = await StartSession(props.row.id)
  
      if (response.status === 200) {
        toast('Race ready to start', { hideProgressBar: true, autoClose: 2000, type: 'success' })
        props.setSessionInProgress(props.row)
      } else {
        console.error("Error preparing race, error:", await response.text());
        toast('Error preparing race', { hideProgressBar: true, autoClose: 2000, type: 'error' })
        props.setInteractable(true)
      }
    } catch (ex) {
      console.error(ex)
      toast('Error preparing race', { hideProgressBar: true, autoClose: 2000, type: 'error' })
      props.setInteractable(true)
    }
  }

  return (
    <TableRow key={props.row.id}>
      <EditableTableCell 
        cellValue = {props.row.id}
        type = 'Number'
        name = 'id'
        label = 'Id'
        isRequired
        edit = {false}
      />
      <EditableTableCell 
        cellValue = {racer1.name + ' - ' + racer1.car}
        type = 'Text'
        name = 'racer1'
        label = 'Racer 1'
        isRequired
        edit = {false}
      />
      <EditableTableCell 
        cellValue = {racer2?.name + ' - ' + racer2?.car}
        type = 'Text'
        name = 'racer2'
        label = 'Racer 2'
        isRequired
        edit = {false}
      />
      <TableCell align='right'>
        <IconButton disabled={!props.interactable} onClick={startSession} aria-label="edit">
            <DirectionsCarIcon />
        </IconButton>
      </TableCell>
    </TableRow>
    )
}