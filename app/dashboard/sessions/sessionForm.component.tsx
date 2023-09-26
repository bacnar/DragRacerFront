"use client";

import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { toast } from "react-toastify";
import configData from "../../../app.config.json";
import User from '../types/User';
import { useRouter } from 'next/navigation';

interface RacerDto {
  userId: number
  stripId: number
}

interface RegisterSessionDto {
  racerDtos: Array<RacerDto>
}

function PostData(formData: RegisterSessionDto): Promise<Response> {
  return fetch(configData.API_URL + 'Sessions', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default function SessionForm(props: {users: Array<User>}) {
  const [loading, setLoading] = React.useState(false);
  const [racer1, setRacer1] = React.useState<RacerDto>({userId: -1, stripId: 0});
  const [racer2, setRacer2] = React.useState<RacerDto>({userId: -1, stripId: 1});
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const {name, value} = event.target

    if (name === "racer1") {
      setRacer1({...racer1, userId: parseInt(value)})
    } else if (name === "racer2") {
      setRacer2({...racer2, userId: parseInt(value)})
    }
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)
    try {
      const response = await PostData({racerDtos: [racer1, racer2]})

      if (response.status === 201) {
        toast('Session sucessfully added', { hideProgressBar: true, autoClose: 2000, type: 'success' })
      } else {
        console.error("Error adding session, error:", await response.text());
        toast('Error adding session', { hideProgressBar: true, autoClose: 2000, type: 'error' })
      }
    } catch (ex) {
      console.error(ex)
      toast('Error adding session', { hideProgressBar: true, autoClose: 2000, type: 'error' })
    } finally {
      setLoading(false)
      setRacer1({userId: -1, stripId: 0})
      setRacer2({userId: -1, stripId: 1})
      router.refresh();
    }
}

  return (
    <form onSubmit={submit}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Select
              required
              id="racer1"
              name='racer1'
              label="Racer 1"
              size="small"
              onChange={handleChange}
              fullWidth={true}
              value={racer1.userId === -1 ? '' : racer1.userId.toString()}
            >
              {props.users.map((item: User) => (
                <MenuItem key={item.id} value={item.id}>{item.name + ' - ' + item.car}</MenuItem>
              ))}
            </Select>
        </Grid>
        <Grid style={{textAlign: 'center', verticalAlign: 'middle'}} item xs={1}>
          VS
        </Grid>
        <Grid item xs={4}>
          <Select
            required={false}
            id="racer2"
            name='racer2'
            label="Racer 2"
            size="small"
            onChange={handleChange}
            fullWidth={true}
            value={racer2.userId === -1 ? '' : racer2.userId.toString()}
          >
            {props.users.map((item: User) => (
              <MenuItem key={item.id} value={item.id}>{item.name + ' - ' + item.car}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<AddIcon />}
            variant="outlined"
            type="submit"
            className='float-right'
          >
            Add
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
}