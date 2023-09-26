import Race from "./Race"

export default interface Session {
  id: number
  races?: Array<Race>
  status: number
  statusNamed: string
}