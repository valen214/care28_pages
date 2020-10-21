

import type { Writable } from "svelte/store";
import {
  makeApiInfoCall,
  AVATAR_BASE_PATH,
  makeApiAppointmentCall,
  Appointment
} from "../api";

export async function init(
  current_user_id: number,
  name: Writable<string>,
  avatar: Writable<string>,
  usertype: Writable<string>,
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
      "avatar",
      "usertype",
    ]
  });
  let result = await res.json();

  name.set(result.display_name);
  avatar.set(AVATAR_BASE_PATH + result.avatar);
  usertype.set(result.usertype);

  let appointment_result: Appointment[] = (await appointment_res).result.map(
    (appointment: any): Appointment => {
      // transform payload appointment to local
      appointment.confirmed = parseInt(appointment.confirmed);
      appointment.finished = parseInt(appointment.finished);
      appointment.local = {
        client_name: appointment.client_name,
        agent_name: appointment.agent_name,
      };
      delete appointment["client_name"];
      delete appointment["agent_name"];
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