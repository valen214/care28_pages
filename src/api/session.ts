

import { REMOTE_ORIGIN } from "./constants";
import { makeApiInfoCall, makeApiCall } from "./rest_util";

const USER_API_URL = REMOTE_ORIGIN + "/wp-json/api/v1/user";
const TOKEN_API_URL = REMOTE_ORIGIN + "/wp-json/jwt-auth/v1/token";


async function validateToken(token: string){
  return fetch(REMOTE_ORIGIN + "/jwt-auth/v1/token/validate", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    }
  });
}
(async function validateSession(){
  let token = localStorage.getItem("token");
  if(token){
    console.log("session cache found, validating...");
    let res = await validateToken(token);
    let result = await res.json();
    console.log(result);
  }
})().catch(e => {
  console.error("session validation failed:", e);
});

export function getCurrentUserID(){
  let id = localStorage.getItem("userID");
  if(id){
    return parseInt(id) || null;
  }
  return null;
}

export async function getCurrentUserInfo(){
  return await makeApiInfoCall({
    type: "query_user",
    fields: [
      "usertype",
      "shop_ID",
    ],
  });
}

export function logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
  localStorage.removeItem("usertype");
}


let loading = false;
export async function login(
  username: string,
  password: string
){
  if(loading){
    console.log("waiting for the previous request to finish");
    return;
  }
  loading = true;

  let token_promise = fetch(TOKEN_API_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    })
  });

  let res = await fetch(USER_API_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: "login",
      username,
      password,
    }),
  });
  if(res.status !== 200){
    let out = await res.json();
    console.error("user login failed:", out);
    loading = false;
    return out;
  }
  let out = await res.json();
  if(out.body !== "ok" ||
  !["client", "agent"].includes(out.usertype)){
    console.error("unexpected api response");
    loading = false;
    return;
  }

  let token_res = await token_promise;
  if(token_res.status !== 200){
    console.error(
        "retrieve JWT failed:",
        token_res,
        await token_res.json()
    );
    loading = false;
    return;
  }

  let token = await token_res.json();
  console.log("retrieved JWT token:", token);

  localStorage.setItem("token", token.token);
  localStorage.setItem("userID", out.id);
  localStorage.setItem("usertype", out.usertype);

  return {
    status: "success",
    usertype: out.usertype
  };
}