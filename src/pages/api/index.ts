

const PRODUCTION = !document.location.href.includes("localhost");
export const REMOTE_ORIGIN = (
  PRODUCTION ? document.location.origin : "http://18.163.56.65"
);
export const LOCAL_ORIGIN = document.location.origin;

console.log(`REMOTE ORIGIN: ${REMOTE_ORIGIN}
LOCAL_ORIGIN: ${LOCAL_ORIGIN}`);

export function onDev(func: () => void){
  if(!PRODUCTION){
    func();
  }
}

export type Agent = {
  name?: string
  rating?: number
  area?: string
  images?: string[]
}

export type Product = {
  id?: number
  name?: string
  description?: string
  thumbnail?: string
  area?: string,
  estate?: string,
  price?: string,
  status?: string,
  lastUpdated?: string
  upload?: {
    thumbnail?: File
  }
};

export type Appointment = {
  client_ID?: number
  agent_ID?: number
  confirmed?: boolean
  finished?: boolean
  requested_date?: string
  area?: string
  estate?: string
  rating_attitude?: number
  rating_info?: number
  rating_time?: number
  rating_property?: number
  rating_overall?: number
  feedback?: string

  local?: {
    agent_name?: string
    client_name?: string
  }
};


type API_PAYLOAD_TYPE = {
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


export const IMAGE_BASE_PATH = REMOTE_ORIGIN + "/wp-content/uploads/";
export const AVATAR_BASE_PATH = REMOTE_ORIGIN + "/wp-content/uploads/avatar/";