import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../../components/title.component';
import Paper from '@mui/material/Paper';
import GetData from '@/lib/helpers/get.helper';
import Race from '../types/Race';
import NewResultRefresher from '@/components/newResultRefresher.component';
import { ParseTimeToString } from '@/lib/helpers/parser.helper';


export default async function BestTime() {
  var rows: Array<Race> = await GetData("Races/byBestTime")

  return <React.Fragment>
    <NewResultRefresher />
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Races by times</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: Race) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.user.name} - {row.user.car}</TableCell>
              <TableCell>{ParseTimeToString(row.result)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </React.Fragment>
}