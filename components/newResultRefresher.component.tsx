"use client"

import * as signalR from "@microsoft/signalr";
import configData from "./../app.config.json";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';


export default function NewResultRefresher() {
  const router = useRouter();

  const connection = new signalR.HubConnectionBuilder()
  .withUrl( configData.WS_URL )
  .build();

  connection.on("raceEnded", () => {
    router.refresh();
  });

  connection.start()
    .catch((ex) => {
      console.error(ex)
      toast('Error connecting to server', { hideProgressBar: true, autoClose: 2000, type: 'error' })
  });
  return "";
}