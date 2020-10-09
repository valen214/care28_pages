
export const ORIGIN = (
    document.location.href.includes("localhost") ?
    "http://18.163.56.65" : document.location.origin
);



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
};

export async function makeApiInfoCall(body: object){
  let token = localStorage.getItem("token");
  if(token){
    body["token"] = token;
  }

  console.log(body);
  return fetch(ORIGIN + "/wp-json/api/v1/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });
}