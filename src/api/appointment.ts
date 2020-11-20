

import { Message } from "../pages/components/chat";
import { makeApiAppointmentCall } from "./rest_util";

export type Appointment = {
  id?: number
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
  initiated_date?: string
  cancelling?: boolean

  agent_name?: string
  client_name?: string
};

export async function confirmAppointment(
    appointment_id: number,
    message: string
){
  let res = await makeApiAppointmentCall({
    "type": "confirm_appointment",
    "appointment_id": appointment_id,
    "message": message,
  }).then(res => res.json());
  console.log("confirmAppointment:", res);
  return res;
}

export async function rejectAppointment(
    appointment_id: number,
    message: string
){
  let res = await makeApiAppointmentCall({
    "type": "reject_appointment",
    "appointment_id": appointment_id,
    "message": message,
  }).then(res => res.json());
  console.log("rejectAppointment:", res);
}