import { toast } from "react-toastify";
import configData from "../../app.config.json";

export default async function DeleteData(path: string, id: number) {
  try {
    const response = await fetch(configData.API_URL + path + id, {cache: "no-store", method: 'DELETE'})
    if (response.status === 204) {
      toast('Entry deleted', { hideProgressBar: true, autoClose: 2000, type: 'success' })
    } else {
      console.error("Error deleting, error:", await response.text());
      toast('Error deleting entry', { hideProgressBar: true, autoClose: 2000, type: 'error' })
    }
  } catch (ex) {
    console.error(ex)
    toast('Error deleting entry', { hideProgressBar: true, autoClose: 2000, type: 'error' })
  }
}