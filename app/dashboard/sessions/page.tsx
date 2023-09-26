import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../../components/title.component';
import User from '../types/User';
import Paper from '@mui/material/Paper';
import GetData from '@/lib/helpers/get.helper';
import Session from '../types/Session';
import SessionForm from './sessionForm.component';
import SessionTableRow from './sessionTableRow.component';

export default async function Sessions() {
  var rows: Array<Session> = await GetData("Sessions")
  var users: Array<User> = await GetData("Users")

  return <React.Fragment>
    <Paper sx={{ p: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
      <Title>Add session</Title>
      <SessionForm users={users} />
    </Paper>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Sessions</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Racer 1</TableCell>
            <TableCell>Racer 2</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row: Session) => (
            <SessionTableRow key={row.id} row={row} users={users} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  </React.Fragment>
}