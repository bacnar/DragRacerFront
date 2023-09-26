import configData from "../../app.config.json";
import GetJwt from "./jwt.helper";

export default async function GetData<T>(path: string) {
  try {
    const token = GetJwt()
    const response = await fetch(configData.API_URL + path, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response.status != 200) {
      console.error("Error getting data at path " + path + ", error:", await response.text());
      return []
    }else {
      return await response.json() as Array<T>
    }
  } catch (ex) {
    console.error(ex)
    return []
  }
}