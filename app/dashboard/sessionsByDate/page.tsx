import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../../components/title.component';
import Paper from '@mui/material/Paper';
import GetData from '@/lib/helpers/get.helper';
import Session from '../types/Session';
import { ParseTimeToString } from '@/lib/helpers/parser.helper';

function DisplaySession(session: Session) {
  const race1 = session.races?.at(0)
  const race2 = session.races?.at(1)

  const user1 = race1?.user!
  const user2 = race2?.user

  return (
    <React.Fragment>
      <TableCell>{user1.name} - {user1.car}</TableCell>
      <TableCell>{ParseTimeToString(race1?.result)}</TableCell>
      <TableCell>{user2?.name} - {user2?.car}</TableCell>
      <TableCell>{ParseTimeToString(race2?.result)}</TableCell>
    </React.Fragment>
  )
}

export default async function SessionsByDate() {
  var rows: Array<Session> = await GetData("Sessions/endedByDate")

  return <React.Fragment>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Latest sessions</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Driver 1</TableCell>
            <TableCell>Time 1</TableCell>
            <TableCell>Driver 1</TableCell>
            <TableCell>Time 2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: Session) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              {DisplaySession(row)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </React.Fragment>
}