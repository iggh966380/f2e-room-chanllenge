import { F2EApiResponse } from "../interface/room";
import { enviroment } from "../../enviroment/enviroment";

export async function fetchRooms(
  url = "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms"
) {
  try {
    const res = (await fetch(url, {
      method: "GET",
      headers: {
        authorization: "Bearer " + enviroment.webToken,
      },
    })) as Response;
    const rooms = (await res.json()) as F2EApiResponse;
    return rooms.items;
  } catch (error) {
    console.error(error);
  }
}
