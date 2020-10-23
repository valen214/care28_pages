
import type { Appointment } from "./index";

export function transformPayloadToAppointment(payload: any): Appointment {
  if(!payload) return null;
  let result = { ...payload };
  result.confirmed = parseInt(result.confirmed);
  result.finished = parseInt(result.finished);
  result.id = parseInt(result.ID);

  delete result["ID"];

  return result;
}