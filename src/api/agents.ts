


import type { Agent } from "./index";
import { REMOTE_ORIGIN, AVATAR_BASE_PATH } from "./constants";
import { makeApiInfoCall } from "./rest_util";

export async function getAllAgents(): Promise<Agent[]> {


  return null;
}

export async function getOutstandingAgents(): Promise<{ [key: string]: Agent }> {
  
  let res = await makeApiInfoCall({
    type: "query_outstanding_agents"
  });
  let agents: Array<any> = (await res.json())?.agents;

  if(agents){
    let output = {};

    console.log("agents:", agents);
    agents.sort((l: any, r: any) => {
      return r.rating - l.rating;
    }).slice(0, 2).forEach(agent => {
      let value = Object.assign({}, agent);
      if(value["avatar"]){
        let path = AVATAR_BASE_PATH + value["avatar"];
        value["images"] = [ path ];
        value["avatar"] = path;
        console.log("path:", path, value);
      }
      output[agent.ID] = value;
    })

    return output;
  } else{
    console.error("did not receive any outstanding agents from server");
  }
}