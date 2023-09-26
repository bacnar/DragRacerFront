"use client"

import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import User from '../types/User';
import EditableTableCell from '../../../components/editableTableCell.component';
import TableActions from '../../../components/tableActions.component';
import { SelectChangeEvent } from '@mui/material/Select';

export default function UserTableRow(props: {row: User}) {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User>(props.row);

  const handleChange = (event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target
    setUser({...user, [name]: value})
  }

  const reset = () => {
    setUser(props.row)
  }

  return (
    <TableRow key={props.row.id}>
      <EditableTableCell 
        cellValue = {user.id}
        type = 'Number'
        name = 'id'
        label = 'Id'
        isRequired
        edit = {false}
        onChange={handleChange}
      />
      <EditableTableCell 
        cellValue = {user.name}
        type = 'Text'
        name = 'name'
        label = 'Name'
        isRequired
        edit = {edit}
        onChange={handleChange}
      />
      <EditableTableCell 
        cellValue = {user.car}
        type = 'Text'
        name = 'car'
        label = 'Car'
        isRequired
        edit = {edit}
        onChange={handleChange}
      />
      <EditableTableCell 
        cellValue = {user.carClassNamed}
        cellSelectValue = {user.carClass.toString()}
        type = 'Select'
        name = 'carClass'
        label = 'Car class'
        isRequired
        edit = {edit} 
        menuItems={[{key: 0, value: "None"}]}
        onChange={handleChange}
      />
      <TableCell align='right'>
        <TableActions onReset={reset} object={user} setEdit={setEdit} edit={edit} rowId={props.row.id} path='Users/' />
      </TableCell>
    </TableRow>
    )
}