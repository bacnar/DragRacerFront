"use client";

import React from 'react';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { toast } from "react-toastify";
import configData from "../../../app.config.json";
import User from '../types/User';
import { useRouter } from 'next/navigation';

function PostData(formData: User): Promise<Response> {
  return fetch(configData.API_URL + 'Users', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default function UserForm() {
  const initialState: User = {id: 0, name: "", car: "", carClass: 0} as User
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<User>(initialState);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const {name, value} = event.target
    setUser({...user, [name]: value})
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)
    try {
      const response = await PostData(user)

      if (response.status === 201) {
        toast('User sucessfully added', { hideProgressBar: true, autoClose: 2000, type: 'success' })
      } else {
        console.error("Error adding user, error:", await response.text());
        toast('Error adding user', { hideProgressBar: true, autoClose: 2000, type: 'error' })
      }
    } catch (ex) {
      console.error(ex)
      toast('Error adding user', { hideProgressBar: true, autoClose: 2000, type: 'error' })
    } finally {
      setLoading(false)
      setUser(initialState)
      router.refresh();
    }
  }

  return (
    <form onSubmit={submit}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            required
            id="name"
            name='name'
            label="Name"
            size="small"
            onChange={handleChange}
            fullWidth={true}
            value={user.name}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            required
            id="car"
            name='car'
            label="Car"
            size="small"
            onChange={handleChange}
            fullWidth={true}
            value={user.car}
          />
        </Grid>
        <Grid item xs={3}>
          <Select
            required
            id="class"
            name='carClass'
            label="Car class"
            size="small"
            onChange={handleChange}
            fullWidth={true}
            value={user.carClass.toString()}
          >
            <MenuItem value={0}>None</MenuItem>
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