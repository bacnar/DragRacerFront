import React from 'react';
import GetData from '@/lib/helpers/get.helper';
import Session from '../types/Session';
import RacePageWrapper from './racePageWrapper';


export default async function Races() {
  var rows: Array<Session> = await GetData("Sessions/notStarted")
  
  return <RacePageWrapper sessions={rows} />
}