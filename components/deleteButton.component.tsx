'use client'
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import DeleteData from '@/lib/helpers/delete.helper';

export default function DeleteButton(props: {deletePath: string, deleteId: number}) {
  const router = useRouter();
  
  const deleteInternal = async () => {
    await DeleteData(props.deletePath, props.deleteId)
    router.refresh();
  }

  return (
    <IconButton aria-label="danger" onClick={() => deleteInternal()}>
      <DeleteIcon color='warning'/>
    </IconButton>
    )
}