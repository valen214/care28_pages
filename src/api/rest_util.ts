
import { REMOTE_ORIGIN } from "./constants";

export type API_PAYLOAD_TYPE = {
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

/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method=post] the method to use on the form
 */
export async function makeFormPost(
    path: string, params: object, method='post'
){
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}