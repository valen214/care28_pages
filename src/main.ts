

// import './App.svelte';


//*
function main(){
  let root = document.createElement("my-app");
  document.body.appendChild(root);
}
function main1(){
  let target: string;
  let prop: object = {};
  
  switch(location.pathname.split("/")[1]){
  case "register":
    target = "pages-register";
    break;
  case "login":
    target = "pages-login";
    break;
  case "profile":
    target = "pages-profile";
    prop = {
      username: "Valen",
      usertype: "client"
    };
    break;
  case "home":
  default:
    target = "pages-home";
    break;
  }
  
  let root = document.createElement(target);
  document.body.appendChild(root);

  setTimeout(() => {
    Object.assign(root, prop);
  });
}

main1();
export default {};
/*/
const app = new App({
	target: document.body,
});
export default app;
/*****/

