
import { REMOTE_ORIGIN } from "./constants";

export type API_PAYLOAD_TYPE = {
  [key: string]: any
} | {
  "type": "query_user" | "edit_user" |
          "query_shop" | "edit_shop" |
          "make_appointments"
};


export async function makeApiCall(
  path: string,
  body: API_PAYLOAD_TYPE
){
  let token = localStorage.getItem("token");
  if(token){
    body["token"] = token;
  }

  console.log("makeApiCall:", path, body);
  return fetch(REMOTE_ORIGIN + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });

}

export async function makeApiInfoCall(body: API_PAYLOAD_TYPE){
  return makeApiCall("/wp-json/api/v1/info", body);
}

export async function makeApiAppointmentCall(body: object){
  return makeApiCall("/wp-json/api/v1/appointments", body);
}
