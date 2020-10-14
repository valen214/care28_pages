



import { makeApiInfoCall, ORIGIN } from "./index";

export function getCurrentUserID(){
  let id = localStorage.getItem("userID");
  if(id){
    return parseInt(id) || null;
  }
  return null;
}

export function logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
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

  const USER_API_URL = ORIGIN + "/wp-json/api/v1/user";
  const TOKEN_API_URL = ORIGIN + "/wp-json/jwt-auth/v1/token";

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
    console.error("user login failed:", await res.json());
    loading = false;
    return;
  }
  let out = await res.json();
  if(out.body !== "ok"){
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

  return {
    status: "success",
    usertype: out.usertype
  };
}