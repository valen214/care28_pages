

const PRODUCTION = !document.location.href.includes("localhost");
export const REMOTE_ORIGIN = (
  PRODUCTION ? document.location.origin : "http://18.163.56.65"
);
export const LOCAL_ORIGIN = document.location.origin;

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
};

export type Appointment = {
  client_id?: number
  agent_id?: number
  client_name?: string
  area?: string
  estate?: string
  rating_attitude?: number
  rating_info?: number
  rating_time?: number
  rating_property?: number
  rating_overall?: number
  feedback?: string
};

export async function makeApiInfoCall(body: object){
  let token = localStorage.getItem("token");
  if(token){
    body["token"] = token;
  }

  console.log("makeApiInfoCall:", body);
  return fetch(REMOTE_ORIGIN + "/wp-json/api/v1/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });
}

export async function makeApiAppointmentCall(body: object){
  let token = localStorage.getItem("token");
  if(token){
    body["token"] = token;
  }

  console.log("makeApiAppointmentCall:", body);
  return fetch(REMOTE_ORIGIN + "/wp-json/api/v1/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });
}


export const IMAGE_BASE_PATH = REMOTE_ORIGIN + "/wp-content/uploads/";
export const AVATAR_BASE_PATH = REMOTE_ORIGIN + "/wp-content/uploads/avatar/";