import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../../components/title.component';
import UserForm from './usersForm.component';
import User from '../types/User';
import UserTableRow from './userTableRow.component';
import Paper from '@mui/material/Paper';
import GetData from '@/lib/helpers/get.helper';

export default async function Users() {
  var rows: Array<User> = await GetData("Users")

  return <React.Fragment>
    <Paper sx={{ p: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
      <Title>Add user</Title>
      <UserForm />
    </Paper>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Users</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Car</TableCell>
            <TableCell>Car class</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: User) => (
            <UserTableRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  </React.Fragment>
}