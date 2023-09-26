"use client"

import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditableTableCell from '../../../components/editableTableCell.component';
import TableActions from '../../../components/tableActions.component';
import { SelectChangeEvent } from '@mui/material/Select';
import Session from '../types/Session';
import User from '../types/User';

interface SessionDto {
  id: number
  races: Array<RaceDto>
}

interface RaceDto {
  id: number
  userId: number
}

export default function SessionTableRow(props: {row: Session, users: Array<User>}) {
  const [edit, setEdit] = React.useState<boolean>(false);

  const race1 = props.row.races!.at(0)!;
  const race2 = props.row.races?.at(1);

  const [racer1, setRacer1] = React.useState<User>(props.users.find(user => user.id === props.row.races?.at(0)?.user.id)!);
  const [racer2, setRacer2] = React.useState<User | undefined>(props.users.find(user => user.id === props.row.races?.at(1)?.user.id));
  
  const handleChange = (event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target

    var user = props.users.find((user) => user.id === parseInt(value))
    if (user === undefined) {
      throw "Cannot select user"
    }

    if (name === "racer1") {
      setRacer1(props.users.find(user => user.id === parseInt(value))!)
    } else if (name === "racer2" && racer2 !== undefined) {
      setRacer2(props.users.find(user => user.id === parseInt(value))!)
    }
  }

  const reset = () => {
    setRacer1(props.users.find(user => user.id === props.row.races?.at(0)?.user.id)!);
    setRacer2(props.users.find(user => user.id === props.row.races?.at(1)?.user.id));
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
        onChange={handleChange}
      />
      <EditableTableCell 
        cellValue = {racer1.name + ' - ' + racer1.car}
        cellSelectValue = {racer1.id.toString()}
        type = 'Select'
        name = 'racer1'
        label = 'Racer 1'
        isRequired
        edit = {edit} 
        menuItems={props.users.map((item: User) => ({key: item.id, value: item.name + ' - ' + item.car}))}
        onChange={handleChange}
      />
      <EditableTableCell 
        cellValue = {racer2?.name + ' - ' + racer2?.car}
        cellSelectValue = {racer2?.id.toString()}
        type = 'Select'
        name = 'racer2'
        label = 'Racer 2'
        isRequired
        edit = {edit} 
        menuItems={props.users.map((item: User) => ({key: item.id, value: item.name + ' - ' + item.car}))}
        onChange={handleChange}
      />
      <EditableTableCell 
        cellValue = {props.row.statusNamed}
        type = 'Text'
        name = 'status'
        label = 'Status'
        isRequired
        edit = {false}
        onChange={handleChange}
      />
      <TableCell align='right'>
        <TableActions onReset={reset} object={{id: props.row.id, races:[{userId: racer1.id, id: race1.id}, racer2 !== undefined && race2 !== undefined ? {userId: racer2.id, id: race2.id} : undefined]} as SessionDto} setEdit={setEdit} edit={edit} rowId={props.row.id} path='Sessions/' />
      </TableCell>
    </TableRow>
    )
}