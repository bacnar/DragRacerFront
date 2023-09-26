import User from "./User"

export default interface Race {
  id: number
  user: User
  stripId: number
  status: number
  statusNamed: string
  start: string
  end: string
  result?: number
}