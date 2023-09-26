"use client"

import React from 'react';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface editableTableCellProps {
  cellValue: string | number,
  cellSelectValue?: string,
  onChange? : ((event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, child?: React.ReactNode) => void)
  edit: boolean,
  type: "Select" | "Text" | "Number",
  name: string
  label: string
  isRequired: boolean
  menuItems?: Array<{key: string | number, value: string}>
}

export default function EditableTableCell(props: editableTableCellProps) {
  if (!props.edit) {
    return <TableCell align='left'>{props.cellValue}</TableCell>
  } else {
    switch (props.type) {
      case "Select":
        return (
          <TableCell align='left'>
            <Select
                required = {props.isRequired}
                id = {props.name}
                name = {props.name}
                label = {props.label}
                size="small"
                onChange={props.onChange}
                fullWidth={false}
                value={props.cellSelectValue}
              >
                {props.menuItems?.map((menuItem) => (
                  <MenuItem key={menuItem.key} value={menuItem.key}>{menuItem.value}</MenuItem>
                ))}
              </Select>
            </TableCell>
          )
      case "Number":
      case "Text":
        return (
          <TableCell align='left'>
            <TextField
              required = {props.isRequired}
              id = {props.name}
              name = {props.name}
              label = {props.label}
              size="small"
              onChange={props.onChange}
              fullWidth={false}
              value={props.cellValue}
            />
          </TableCell>
        )

      default: throw new Error("Not implemented");
    }
  }
}