

export function getAppointmentIdFromQuery(){
  let query = new URLSearchParams(location.search);
  return parseInt(query.get("id")) || null;
}