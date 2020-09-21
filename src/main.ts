

// import './App.svelte';

//*
let target: string;
switch(location.pathname.split("/")[1]){
case "profile":
  target = "pages-profile";
  break;
case "home":
default:
  target = "pages-home";
  break;
}

let root = document.createElement(target);
document.body.appendChild(root);
/*/
const app = new App({
	target: document.body,
});
/*****/


export default app;