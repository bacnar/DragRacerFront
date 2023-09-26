import { Session } from "next-auth";
import { getServerSession } from "next-auth/next"
import { getSession } from "next-auth/react";

export default async function GetJwt() {
  const componentType = typeof window === 'undefined' ? 'server' : 'client';
  console.log(componentType)

  let session: Session | null

  if (typeof window === 'undefined') {
    // Server
    session = await getServerSession()
  } else {
    session = await getSession()
  }

  if (session === null) {
    throw "Error getting session"
  }

  //console.log(session.user)
  return session.user.token
} 