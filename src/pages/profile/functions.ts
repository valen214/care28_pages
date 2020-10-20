

import type { Writable } from "svelte/store";
import {
  makeApiInfoCall,
  AVATAR_BASE_PATH,
  makeApiAppointmentCall
} from "../api";

export async function init(
  current_user_id: number,
  name: Writable<string>,
  avatar: Writable<string>,
  pending_appointments: Writable<any>
){
  let appointment_res = makeApiAppointmentCall({
    "type": "query_appointments"
  }).then(res => res.json());

  let res = await makeApiInfoCall({
    "type": "query_user",
    "id": current_user_id,
    "fields": [
      "display_name",
      "avatar"
    ]
  });
  let result = await res.json();

  name.set(result.display_name);
  avatar.set(AVATAR_BASE_PATH + result.avatar);

  let appointment_result = (await appointment_res).result;
  appointment_result = appointment_result.map(
    (appointment: any) => {
      appointment.confirmed = parseInt(appointment.confirmed);
      appointment.finished = parseInt(appointment.finished);
      return appointment;
    }
  );
  console.log(appointment_result);
  pending_appointments.set(
    appointment_result.filter(
      (appointment: any) => !appointment.confirmed
    )
  );
}