

import type { Writable } from "svelte/store";
import {
  makeApiInfoCall,
  AVATAR_BASE_PATH,
  makeApiAppointmentCall,
  Appointment,
  Tag,
  transformTags
} from "../../api";
import { transformPayloadToAppointment } from "../../api/appointment_util";

export async function init(
  current_user_id: number,
  name: Writable<string>,
  avatar: Writable<string>,
  usertype: Writable<string>,
  appointments: Writable<any>,
  tags: Writable<Tag[]>
){
  let appointment_res = makeApiAppointmentCall({
    "type": "query_appointments"
  }).then(res => {
    console.log("appointment response:", res);
    return res.json()
  }).catch(e => {
    console.log("get appointments failed", e);
    throw new Error("get appointment failed");
  });


  let res = await makeApiInfoCall({
    "type": "query_user",
    "id": current_user_id,
    "fields": [
      "display_name",
      "avatar",
      "usertype",
      "tags",
    ]
  });
  let result = await res.json();

  name.set(result.display_name);
  avatar.set(AVATAR_BASE_PATH + result.avatar);
  usertype.set(result.usertype);
  if(result.tags){
    tags.set(transformTags(result.tags));
  }
  console.log("tags:", tags, result.tags);

  let appointment_result: Appointment[] = (
    await appointment_res
  ).result.map(transformPayloadToAppointment);
  console.log(appointment_result);
  appointments.set(appointment_result);
}