"use client"

import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteButton from './deleteButton.component';
import configData from "../app.config.json";
import { toast } from "react-toastify";

interface TableActionProps {
  edit: boolean
  rowId: number
  path: string
  object: object
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  onReset: () => void
}

async function UpdateRow(id: number, object: object, path: string) {
  return fetch(configData.API_URL + path + id, {
    method: 'PUT',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json'
    }})
}

export default function TableActions(props: TableActionProps) {
  const toggleEdit = () => {
    props.setEdit(!props.edit);
  };

  const updateRow = async () => {
    try {
      const response = await UpdateRow(props.rowId, props.object, props.path)
  
      if (response.status === 204) {
        toast('Entry sucessfully updated', { hideProgressBar: true, autoClose: 2000, type: 'success' })
      } else {
        console.error("Error updating entry, error:", await response.text());
        toast('Error updating entry', { hideProgressBar: true, autoClose: 2000, type: 'error' })
        props.onReset()
      }
    } catch (ex) {
      console.error(ex)
      toast('Error updating entry', { hideProgressBar: true, autoClose: 2000, type: 'error' })
      props.onReset()
    } finally {
      toggleEdit()
    }
  }

  const resetRow = () => {
    props.onReset()
    toggleEdit()
  }

  if (props.edit) {
    return (
      <React.Fragment>
        <IconButton onClick={updateRow} aria-label="edit">
          <CheckIcon />
        </IconButton>
        <IconButton onClick={resetRow} aria-label="edit">
          <ClearIcon />
        </IconButton>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <IconButton onClick={toggleEdit} aria-label="edit">
          <EditIcon />
        </IconButton>
        <DeleteButton deleteId={props.rowId} deletePath={props.path}/>
      </React.Fragment>
    )    
  }
}