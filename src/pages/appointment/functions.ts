

import type { Agent } from "../api";
import {
  makeApiInfoCall,
  AVATAR_BASE_PATH,
  makeApiAppointmentCall
} from "../api";

export function getAgentIdFromQuery(){
  let searchParam = new URLSearchParams(location.search);
  let id = searchParam.get("agent_id");
  if(id){
    return parseInt(id);
  }
}


export async function getAgentInfo(id: number){
  console.log(`getAgentInfo(${id})`);
  let res = await makeApiInfoCall({
    type: "query_user",
    id,
    fields: [
      "display_name",
      "usertype",
      "avatar"
    ]
  });
  console.log("result:", await res.clone().text());
  try{

    let result = await res.json();
    if(result.usertype !== "agent"){
      return null;
    }
    
    let agent: Agent = {
      name: result.display_name,
      images: [
        AVATAR_BASE_PATH + result.avatar
      ],
    };
    return agent;
  } catch(e){
    console.error(e);
  }
}


export async function submitAppointment(
  agent_id: number,
  client_id: number,
  date: string,
  message?: string
){
  console.log("make appointment:", agent_id, date, message);
  let res = await makeApiAppointmentCall({
    "type": "make_appointment",
    "agent_id": agent_id,
    "client_id": client_id,
    "date": date,
    "client_message": message
  });
  console.log("result:", await res.clone().text());
  let result = await res.json();
  if(result.status === "success"){
    console.log("ok", result.appointment_id);
    return {
      "status": "success",
      "appointment_id": result.appointment_id
    };
  } else{
    return {
      "status": "failed",
      "result": result,
    }
  }
}